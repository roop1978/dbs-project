import React from "react";
import AnnouncementPage from "./components/AnnouncementPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentLogin from "./components/StudentLogin";
import AdminLogin from "./components/AdminLogin";
import CommunityEventsPage from "./components/CommunityEvents";
import LandingPage from "./components/LandingPage";
import Menu from "./components/Menu";
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
    {
      path: "/landing-page",
      element: <LandingPage />,
    },
    {
      path: "/menu",
      element: <Menu />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
