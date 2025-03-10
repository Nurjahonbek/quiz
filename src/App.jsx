
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Quiz from "./pages/Quiz";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

import MainLayout from "./layout/MainLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/quiz/:title",
          element: <Quiz />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
