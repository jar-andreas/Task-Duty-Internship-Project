import { Router } from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controller/user.controller.js";
import { validateFormData } from "../middleware/validateFormData.js";
import {
  validateLoginUserSchema,
  validateSignUpSchema,
} from "../utils/formValidation.js";
import { rateLimiter } from "../middleware/rateLimit.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post(
  "/signup",
  rateLimiter(10),
  validateFormData(validateSignUpSchema),
  registerUser,
);

router.post(
  "/login",
  rateLimiter(15),
  validateFormData(validateLoginUserSchema),
  loginUser,
);

router.get("/get", authenticate, getUser);

router.post("/refresh-token", refreshToken);

router.post("/logout", authenticate, logoutUser);

export default router;
