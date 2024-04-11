import React from "react";
import AnnouncementPage from "./components/AnnouncementPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentLogin from "./components/StudentLogin";
import AdminLogin from "./components/AdminLogin";
import CommunityEventsPage from "./components/CommunityEvents";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AnnouncementPage />,
    },
    {
      path: "/student-login",

      element: <StudentLogin />,
    },
    {
      path: "/admin-login",

      element: <AdminLogin />,
    },
    {
      path: "/community",

      element: <CommunityEventsPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
