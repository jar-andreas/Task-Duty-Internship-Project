import Task from "../model/task.model.js";
import responseHandler from "../utils/responseHandler.js";

export const createTask = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const { title, description, tags } = req.body;
    if (!title || !description || !tags) {
      return next(
        responseHandler.errorResponse(
          "Please fill in all the necessary fields: Title, Description and Tags.",
          400,
        ),
      );
    }
    const newTask = await Task.create({
      userId,
      title,
      description,
      tags,
    });
    return responseHandler.successResponse(
      res,
      newTask,
      "Task created successfully",
      201,
    );
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  const userId = req.user.id;
  try {
    if (!userId) {
      return next(
        responseHandler.unauthorizedResponse(
          "Sorry but you are not authorized to access these tasks",
        ),
      );
    }
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    if (!tasks || tasks.length === 0) {
      return responseHandler.successResponse(
        res,
        [],
        "No tasks found for this user",
        200,
      );
    }
    return responseHandler.successResponse(
      res,
      tasks,
      "Tasks retrieved successfully",
      200,
    );
  } catch (error) {
    next(error);
  }
};

export const getSingleTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const task = await Task.findOne({ _id: id, userId: userId });
    if (!task) {
      return next(
        responseHandler.notFoundResponse("Task not found or unauthorized", 404),
      );
    }
    return responseHandler.successResponse(
      res,
      task,
      "Task retrieved successfully",
      200,
    );
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, tags } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, tags },
      // { new: true } returns the modified document rather than the original
      //{ runValidators: true } ensures the new data follows your Schema rules
      { new: true, runValidators: true },
    );
    if (!updatedTask) {
      return next(responseHandler.errorResponse(res, "Task not found", 404));
    }
    return responseHandler.successResponse(
      res,
      updatedTask,
      "Task updated successfully",
      200,
    );
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return next(responseHandler.notFoundResponse("Task not found", 404));
    }
    return responseHandler.successResponse(
      res,
      null,
      "Task deleted successfully",
      200,
    );
  } catch (error) {
    next(error);
  }
};
