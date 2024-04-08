import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import MyAdvertisementsPage from "./pages/MyAdvertisementsPage";
import { AuthProvider } from "./context/AuthContext";
import CreateAdvertisementPage from "./pages/CreateAdvertisementPage";
import UpdateAdvertisementPage from "./pages/UpdateAdvertisementPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/user-profile",
          element: <UserProfilePage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/my-advertisements",
          element: <MyAdvertisementsPage />,
        },
        {
          path: "/create-advertisement", 
          element: <CreateAdvertisementPage />
        },
        
        {
          path: "/update-advertisement/:id", 
          element: <UpdateAdvertisementPage />
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
