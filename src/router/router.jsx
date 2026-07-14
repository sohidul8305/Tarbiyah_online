import { createBrowserRouter } from "react-router";
import RootLayouts from "../RootLayouts/RootLayouts";
import Home from "../Page/Home/Home";
import About from "../Page/Home/About/About";
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
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
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
        path: "/management",
        Component: Management,
      },
      {
        path: "/faculty",
        Component: Faculty,
      },
      {
        path: "/live-course",
        Component: Live_course,
      },
      {
        path: "/recorded-course",
        Component: Recorded_course,
      },
      {
        path: "/events",
        Component: Events,
      },
      {
        path: "/gallery",
        Component: Gallery,
      },
    ],
  },
]);
