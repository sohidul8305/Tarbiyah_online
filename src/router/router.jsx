import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "../RootLayouts/RootLayouts";
import Home from "../Page/Home/Home";
import About from "../Page/Home/About/About";
import Course from "../Page/Home/Course/Course";
import Consultancy from "../Page/Home/Consultancy/Consultancy";
import Blog from "../Page/Home/Blog/Blog";
import Sponsorship from "../Page/Home/Sponsorship/Sponsorship";
import Teacher from "../Page/Home/Teacher/Teacher";
import Admin from "../Page/Admin/Admin";
import Student from "../Page/Student/Student";
import Management from "../Page/Management/Management";
import Faculty from "../Components/Faculty/Faculty";
import Live_course from "../Page/Live_course/Live_course";
import Recorded_course from "../Page/Recorded_course/Recorded_course";
import Events from "../Page/Events/Events";
import Gallery from "../Page/Gallery/Gallery";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";

export const router = createBrowserRouter([
  // Main Layout Routes
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "course",
        element: <Course />,
      },
      {
        path: "consultancy",
        element: <Consultancy />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "sponsorship",
        element: <Sponsorship />,
      },
      {
        path: "teacher",
        element: <Teacher />,
      },
      {
        path: "faculty",
        element: <Faculty />,
      },
      {
        path: "live-course",
        element: <Live_course />,
      },
      {
        path: "recorded-course",
        element: <Recorded_course />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "student",
        element: <Student />,
      },
      {
        path: "management",
        element: <Management />,
      },
    ],
  },
  // Login/Register আলাদা Routes (Layout ছাড়া)
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
