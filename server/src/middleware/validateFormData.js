import { ZodError } from "zod";

export const validateFormData = (schema) => (req, res, next) => {
  try {
    //receive the form from the req.body and transform via zod
    const parsedData = schema.parse(req.body);
    req.body = parsedData; //transformed formDta with no error - validation passed
    next(); // calls the next action that is supposed to happen
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMsg = error.issues.map((issue) => ({
        message: `${issue.message}`,
      }));
      return res.status(400).json({
        error: "Error validating form data",
        details: errorMsg,
      });
    }
    next(error);
  }
};
