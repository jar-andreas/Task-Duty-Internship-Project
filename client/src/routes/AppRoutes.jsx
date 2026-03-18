import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { Suspense } from "react";
import LazySpinner from "@/components/LazySpinner";

const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const TaskFormLayout = lazy(() => import("@/layouts/TaskFormLayout"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));

const Home = lazy(() => import("@/pages/landing/Home"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const Login = lazy(() => import("@/pages/auth/Login"));
const MyTask = lazy(() => import("@/pages/tasks/MyTask"));
const NewTask = lazy(() => import("@/pages/tasks/NewTask"));
const EditTask = lazy(() => import("@/pages/tasks/EditTask"));

export default function AppRoutes() {
  const { accessToken } = useAuth();
  const route = [
    {
      path: "/",
      element: (
        <Suspense fallback={<LazySpinner />}>
          <RootLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PrivateRoute accessToken={accessToken}>
            <TaskFormLayout />
          </PrivateRoute>
        </Suspense>
      ),
      children: [
        {
          path: "my-tasks",
          element: <MyTask />,
        },
        {
          path: "new-task",
          element: <NewTask />,
        },
        {
          path: "edit-task/:id",
          element: <EditTask />,
        },
      ],
    },
    {
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PublicRoute accessToken={accessToken}>
            <AuthLayout />
          </PublicRoute>
        </Suspense>
      ),
      children: [
        {
          path: "auth/signup",
          element: <Signup />,
        },
        {
          path: "auth/login",
          element: <Login />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(route);
  return <RouterProvider router={router} />;
}
