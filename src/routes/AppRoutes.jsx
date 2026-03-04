import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const TaskFormLayout = lazy(() => import("@/layouts/TaskFormLayout"));

const Home = lazy(() => import("@/pages/landing/Home"));
const MyTask = lazy(() => import("@/pages/tasks/MyTask"));
const NewTask = lazy(() => import("@/pages/tasks/NewTask"));
const EditTask = lazy(() => import("@/pages/tasks/EditTask"));

export default function AppRoutes() {
  const route = [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "my-tasks",
          element: <MyTask />,
        },
      ],
    },
    {
      element: <TaskFormLayout />,
      children: [
        {
          path: "new-task",
          element: <NewTask />,
        },
        {
          path: "edit-task",
          element: <EditTask />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(route);
  return <RouterProvider router={router} />;
}
