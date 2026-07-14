import { createBrowserRouter } from "react-router";
import RootLayouts from "../RootLayouts/RootLayouts";
import Home from "../Page/Home/Home";
import About from "../Page/Home/About/About";
<<<<<<< HEAD
=======
import Course from "../Page/Home/Course/Course";
>>>>>>> 8a244edf2be928f2d8c87acdf199ba27d8dbbae2
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
<<<<<<< HEAD
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
=======






>>>>>>> 8a244edf2be928f2d8c87acdf199ba27d8dbbae2

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
<<<<<<< HEAD
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
=======
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
>>>>>>> 8a244edf2be928f2d8c87acdf199ba27d8dbbae2
        Component: Student,
      },

      {
<<<<<<< HEAD
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
=======
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


    ]
  },
]);
>>>>>>> 8a244edf2be928f2d8c87acdf199ba27d8dbbae2
