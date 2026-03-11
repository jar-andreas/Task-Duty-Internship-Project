import express from "express";
import cors from "cors";
import { createServer } from "http";
import mongoose from "mongoose";
import morgan from "morgan";
import {
  catchNotFoundRoute,
  globalErrorHandler,
} from "./src/middleware/errorHandler.js";

//import api routes
import userRoutes from "./src/route/user.route.js";

const app = express();
const httpServer = createServer(app);
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-duty-project-sable.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.disable("x-powered-by");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//get request time when the server is running
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//test api route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Server is running",
    environment: process.env.NODE_ENV,
    time: req.requestTime,
  });
});

//assemble api routes
app.use("/api/v1/user", userRoutes);

//handle app errors
app.use((req, res, next) => {
  return next(catchNotFoundRoute(req, res));
});

app.use((err, req, res, next) => {
  return next(globalErrorHandler(err, req, res));
});

const connectOptions = {
  dbName: "TaskDutyProject",
  serverSelectionTimeoutMs:
    process.env.NODE_ENV === "development" ? 45000 : 10000,
  socketTimeoutMs: 30000,
  retryWrites: true,
  retryReads: true,
  maxPoolSize: 100,
  minPoolSize: 1,
};

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Connected: ${conn.connection.host}`);
    //connection event handler
    mongoose.connection.on("error", (err) => {
      console.error("MongoDb connection error", err);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDb disconnected");
    });
    //handle graceful shutdown
    const gracefulShutdown = async () => {
      await mongoose.connection.close();
      console.log("MongoDb connection closed via app termination");
      process.exit(0); //exit the node process
    };
    process.on("SIGINT", gracefulShutdown); //signal interruption - CTRL + C
    process.on("SIGTERM", gracefulShutdown); //signal termination
    return conn;
  } catch (error) {
    console.error("MongoDb connection failed", error.message);
    process.exit(1); //exit the process, 1 usually indicates error/failure
  }
};

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectToDb();
    const server = httpServer.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
      );
    });
    process.on("unhandledRejection", (err) => {
      console.error("UNHANDLED REJECTION, shutting down...");
      console.error(err.name, err.message);
      //close server gracefully
      server.close(() => {
        console.log("Process terminated due to unhandled rejection");
      });
    });
    //handle graceful server shutdown
    const shutdown = async () => {
      console.log("Receiving shutdown signal. Closing server...");
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    };
    //handle termination signal.
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
