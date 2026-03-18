import { ChevronLeft, Loader } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { getSingleTask, updateTask } from "@/api/task";
import { toast } from "react-toastify";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateTaskSchema } from "@/utils/dataSchema";
import { tagStyles } from "@/utils/constant";

export default function EditTask() {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getSingleTask(id, accessToken),
  });

  const singleTask = data?.data?.data;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateTaskSchema),
    values: {
      title: singleTask?.title || "",
      description: singleTask?.description || "",
      tags: singleTask?.tags || "",
    },
  });
  const selectedTag = useWatch({
    control,
    name: "tags",
  });

  const mutation = useMutation({
    mutationFn: ({ id, taskData, accessToken }) =>
      updateTask(id, taskData, accessToken),
    onSuccess: (res) => {
      toast.success(res.data.message || "Task updated successfully");
      queryClient.invalidateQueries(["tasks"]);
      navigate("/my-tasks");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrongF");
    },
  });

  const onSubmitForm = (data) => {
    mutation.mutate({ id, taskData: data, accessToken });
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto px-6 lg:px-20 py-10">
      <div className="flex items-center gap-1">
        <ChevronLeft
          onClick={() => navigate(-1)}
          className="cursor-pointer"
          size={30}
        />
        <h1 className="font-medium text-3xl lg:text-4xl">Edit Task</h1>
      </div>
      {isPending && (
        <div className="flex flex-col items-center justify-center py-40">
          <p className="text-(--primary-color)">Fetching task details...</p>
          <Loader className="animate-spin text-(--primary-color)" />
        </div>
      )}
      {isError && (
        <div className="flex flex-col items-center justify-center mt-40 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
          <p className="text-red-500 font-medium">
            Error: {error?.response?.message || "Failed to load task"}
          </p>
          <Link to="/my-tasks" className="mt-4 text-sm text-red-700 underline">
            Go back to My Tasks
          </Link>
        </div>
      )}
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mt-10">
          <fieldset className="border border-gray-300 rounded w-full">
            <legend className="ml-5 text-lg text-(--lorem-color) mb-2">
              Task Title
            </legend>
            <textarea
              className="w-full h-8 outline-none px-5 text-xs border-none rounded resize-none"
              {...register("title")}
            />
          </fieldset>
          <p className="text-red-500 text-xs mt-1">{errors.title?.message}</p>
        </div>
        <div className="mt-10">
          <fieldset className="border border-gray-300 rounded w-full">
            <legend className="ml-5 text-lg text-(--lorem-color) mb-2">
              Description
            </legend>
            <textarea
              className="w-full h-40 outline-none px-5 text-xs border-none rounded resize-none"
              {...register("description")}
            />
          </fieldset>
          <p className="text-red-500 text-xs mt-1">
            {errors.description?.message}
          </p>
        </div>
        <div className="mt-10 relative">
          <fieldset className="border border-gray-300 rounded w-full pb-2">
            <legend className="ml-5 text-lg text-(--lorem-color) px-2">
              Tags
            </legend>
            <div className="px-5 flex justify-between items-center w-full pt-1 pb-3">
              <span className="text-gray-500 text-xs">Select Options</span>
              <select
                className={`text-xs border border-gray-500 outline-none p-1 rounded  ${
                  tagStyles[selectedTag] || tagStyles.default
                }`}
                {...register("tags")}
              >
                <option value="" disabled>
                  Select options
                </option>
                <option value="Urgent" className="text-red-500">
                  Urgent
                </option>
                <option value="Important" className="text-(--important-green)">
                  Important
                </option>
                <option value="Personal" className="text-blue-500">
                  Personal
                </option>
              </select>
            </div>
          </fieldset>
          <p className="text-red-500 text-xs mt-1">{errors.tags?.message}</p>
        </div>
        <button
          className="bg-(--primary-color) text-white text-lg rounded w-full px-6 py-2 mt-10 flex justify-center items-center gap-2"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader className="animate-spin" size={18} />
              Saving...
            </>
          ) : (
            "Done"
          )}
        </button>
      </form>
      <button
        onClick={scrollUp}
        className="underline text-(--primary-color) cursor-pointer my-2 text-center w-full"
      >
        Back To Top
      </button>
    </div>
  );
}
