
import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CourseList from "../pages/courses/CourseList";
//
// import LearningJourney from "../pages/LearningJourney";
import App from"../App"
import CodeEntry from "../components/codexplainer/CodeEntry";
import Landingpage from "../pages/Landingpage";
import CourseDetailPage from "../pages/courses/CourseDetailPage";
import ConceptPage from "../pages/courses/ConceptPage";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Singup";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";

// Redirect component for /roadmap route
const RoadmapRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Navigate to home and then scroll to roadmap section
    navigate("/", { replace: true });
    // Use setTimeout to ensure page is loaded before scrolling
    const timer = setTimeout(() => {
      const element = document.querySelector("#roadmap");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return null;
};

// const RouterWrapper = () => {
//   const { isAuthenticated } = useAuth();

//   // 👇 Define helper function here (inside this file)
//   const requireAuth = (element) =>
//     isAuthenticated ? element : <Login />;
// }

const router = createBrowserRouter([
  {
   path: "/", 
   element: <App />,
   children: [
    {
      index: true,
      path:"/",
      element:<Landingpage/>
    },
    {
      path:"/codexplainer",
      element:<CodeEntry />
    },
    {
      path: "/course",
      element: <Navigate to="/courses" replace />, // Redirect /course to /courses
    },
    {
      path: "/roadmap",
      element: <RoadmapRedirect />, // Redirect /roadmap to landing page and scroll to roadmap section
    },
    {
      path: "/courses",
      element: <CourseList />, // Course list page
    },
    {
      path:"/login",
      element:<Login/> // Login page
    },
    {
      path:"/signup",
      element:<Signup/> // Signup page
    },
       
       
        {
          path: "courses",
          element: <CourseList /> // List all courses
        },
        {
          path: "courses/:courseId",
          element: <CourseDetailPage /> // Course detail with milestones
        },
        {
          path: "courses/:courseId/milestone/:milestoneId/concept/:conceptId",
          element:
          <ProtectedRoute>

          <ConceptPage /> 
        </ProtectedRoute>
        },
        {
          path:"/dashboard",
          element:<ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }
      
      
    
    // {
    //   path: "learning",
    //   children: [
    //     { index: true, element: <LearningJourney /> },
    //     { path: "course/:courseId", element: <CourseDetailPage /> },
    //     {
    //       path: "course/:courseId/milestone/:milestoneId",
    //       element: requireAuth(<MilestoneDetail />),
    //     },
    //     {
    //       path: "course/:courseId/milestone/:milestoneId/concept/:conceptId",
    //       element: requireAuth(<ConceptPage />),
    //     },
    //   ],
    // },
   ] // Home page
  },
  
  // {
  //   path: "/course",
  //   element: <LearningJourney />, // Learning journey page
  // },
]);

export default router;
