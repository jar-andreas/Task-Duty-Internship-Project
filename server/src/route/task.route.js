import Router from "express";
import {
  createTask,
  deleteTask,
  getSingleTask,
  getTasks,
  updateTask,
} from "../controller/task.controller.js";
import { validateFormData } from "../middleware/validateFormData.js";
import { validateTaskSchema } from "../utils/formValidation.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post(
  "/create",
  authenticate,
  validateFormData(validateTaskSchema),
  createTask,
);

router.get("/getmytasks", authenticate, getTasks);

router.get("/get/:id", authenticate, getSingleTask);

router.patch("/update/:id", authenticate, updateTask);

router.delete("/delete/:id", authenticate, deleteTask);

export default router;
