import { createBrowserRouter } from "react-router";
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
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";





export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
       path: "/about",
        Component: About,
      },
      {
       path: "/course",
        Component: Course,
      },
      {
       path: "/consultancy",
        Component: Consultancy,
      },
      {
       path: "/blog",
        Component: Blog,
      },
      {
       path: "/sponsorship",
        Component: Sponsorship,
      },
      {
       path: "/teacher",
        Component: Teacher,
      },
      {
       path: "/admin",
        Component: Admin,
      },
      {
       path: "/student",
        Component: Student,
      },
      {
       path: "/register",
        Component: Register,
      },
      {
       path: "/login",
        Component: Login,
      },

    ]
  },
]);