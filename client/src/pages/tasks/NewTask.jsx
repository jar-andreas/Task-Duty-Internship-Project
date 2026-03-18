import { ChevronDown, ChevronLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { validateTaskSchema } from "@/utils/dataSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { createTask } from "@/api/task";
import { tagStyles } from "@/utils/constant";

export default function NewTask() {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(validateTaskSchema) });
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const selectedTag = useWatch({
    control,
    name: "tags",
  });

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: (res) => {
      toast.success(res.data.message || "Task created successfully");
      queryClient.invalidateQueries({ queryKey: ["userTasks"] });
      navigate("/my-tasks");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Failed to create task",
      );
    },
  });

  const onSubmitForm = async (data) => {
    mutation.mutate({ formData: data, accessToken });
  };
  return (
    <div className="container mx-auto px-6 lg:px-20 py-10">
      <div className="flex items-center gap-1">
        <ChevronLeft
          onClick={() => navigate(-1)}
          className="cursor-pointer"
          size={30}
        />
        <h1 className="font-medium text-3xl lg:text-4xl">New Task</h1>
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mt-10">
          <fieldset className="border border-gray-300 rounded w-full">
            <legend className="ml-5 text-lg text-(--lorem-color) mb-2">
              Task Title
            </legend>
            <textarea
              placeholder="E.g. Project Defense, Assignment..."
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
              placeholder="Briefly describe your task..."
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
              <span className="text-gray-500 text-xs">Select Tag</span>
              <select
                name="tags"
                className={`text-xs outline-none p-1 border border-gray-500 rounded ${
                  tagStyles[selectedTag] || tagStyles.default
                }`}
                {...register("tags")}
              >
                <option value="" disabled selected>
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
          <button
            className="bg-(--primary-color) text-white text-lg rounded w-full px-6 py-2 mt-10 flex justify-center items-center gap-2"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader className="animate-spin" size={18} />
                Creating task...
              </>
            ) : (
              "Done"
            )}
          </button>
        </div>
      </form>
      <button
        onClick={scrollUp}
        className="underline mt-4 text-(--primary-color) cursor-pointer my-2 text-center w-full"
      >
        Back To Top
      </button>
    </div>
  );
}
