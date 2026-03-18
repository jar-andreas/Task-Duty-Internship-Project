import { useAuth } from "@/hooks/useAuth";
import { Edit, Plus, Trash2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask, getMyTasks } from "@/api/task";
import LazySpinner from "@/components/LazySpinner";
import { toast } from "react-toastify";
import DeleteModal from "@/components/DeleteModal";
import { useDebouncedCallback } from "use-debounce";

export default function MyTask() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { accessToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedTask, setSelectedTask] = useState(null);
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getMyTasks(accessToken),
  });
  const allTasks = data?.data?.data || [];
  const mutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (res) => {
      toast.success(res.data.message || "Task deleted successfully");
      queryClient.invalidateQueries(["tasks"]);
      setSelectedTask(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete task");
    },
  });
  const handleDeleteTask = async () => {
    if (selectedTask) {
      mutation.mutate({ id: selectedTask._id, accessToken });
    }
  };
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const query = searchParams.get("query") || "";

  const debouncedFn = useDebouncedCallback((e) => {
    e.preventDefault();
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value.length >= 3) {
      params.set("query", value);
      navigate(location.pathname + "?" + params.toString());
    } else {
      navigate(location.pathname);
      params.delete("query");
      setSearchParams(params);
    }
    setSearchParams(params);
  }, 500);

  const filteredTasks = useMemo(() => {
    const searchedWord = searchParams.get("query")?.toLowerCase() || "";

    // If there's no search term, show everything
    if (!searchedWord) return allTasks;

    // Otherwise, filter the list
    return allTasks.filter(
      (task) =>
        task.title?.toLowerCase().includes(searchedWord) ||
        task.description?.toLowerCase().includes(searchedWord),
    );
  }, [searchParams, allTasks]);
  return (
    <div className="container mx-auto px-6 lg:px-20 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-3xl lg:text-4xl">My Tasks</h1>
        <div className="flex items-center gap-2">
          <Plus size={18} className="text-(--primary-color)" />
          <Link
            to="/new-task"
            className="text-(--primary-color) cursor-pointer font-medium rounded"
          >
            Add New Task
          </Link>
        </div>
      </div>
      <label className="input mt-6 w-full outline-none border border-(--primary-color) rounded-lg">
        <svg
          className="h-[1em] opacity-100 text-(--primary-color)"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          required
          placeholder="Search for task"
          className="placeholder:text-(--primary-color)"
          defaultValue={query}
          onChange={debouncedFn}
        />
      </label>
      <div className="mt-8 mb-6">
        {isPending && (
          <div className="flex justify-center py-20">
            <LazySpinner />
          </div>
        )}
        {isError && (
          <p className="flex justify-center py-20 text-red-500">
            Error: {error?.response?.data?.message || "Failed to load tasks"}
          </p>
        )}
        {!isPending &&
          !isError &&
          filteredTasks.length > 0 &&
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="mb-8 px-2 border border-gray-300 rounded py-4"
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`${task.tags === "Urgent" ? "text-red-500" : task.tags === "Important" ? "text-(--important-green)" : "text-blue-500"} font-light`}
                >
                  {task.tags}
                </h3>

                <div className="flex flex-wrap gap-4 items-center">
                  <Link
                    to={`/edit-task/${task._id}`}
                    className="flex gap-3 items-center bg-(--primary-color) text-white text-sm cursor-pointer rounded px-4 py-1"
                  >
                    <Edit size={18} />
                    <p className="tracking-wide">Edit</p>
                  </Link>
                  <div
                    className="flex gap-3 items-center text-(--primary-color) border border-(--primary-color) rounded px-4 py-1 text-sm cursor-pointer"
                    onClick={() => setSelectedTask(task)}
                  >
                    <Trash2 size={18} className="" />
                    <button className="font-medium">Delete</button>
                  </div>
                </div>
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="my-4">
                <h1 className="text-xl font-medium">{task.title}</h1>
                <p className="text-base-content opacity-65 mt-2 wrap-break-word overflow-hidden">
                  {task.description}
                </p>
              </div>
            </div>
          ))}
        {!isPending && allTasks.length === 0 && (
          <p className="text-center py-40">
            No tasks found. Click "Add New Task" to get started!
          </p>
        )}
      </div>
      <button
        onClick={scrollUp}
        className="underline text-(--primary-color) cursor-pointer my-2 text-center w-full"
      >
        Back To Top
      </button>
      <DeleteModal
        taskTitle={selectedTask?.title}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        isPending={mutation.isPending}
        onConfirm={handleDeleteTask}
      />
    </div>
  );
}
