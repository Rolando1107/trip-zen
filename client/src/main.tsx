import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.tsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home.tsx';
import Error from './pages/ErrorPage.tsx';
import Login from "./pages/Login.tsx";
import Settings from "./pages/settings.tsx";
import ProfilePage from "./pages/profilePage.tsx";
import Signup from "./pages/signUp.tsx";
import Save from "./components/Save.tsx";
import { SavedLocationsProvider } from "../context/SavedLocationsContext.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/settings',
        element: <Settings />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/saved',
        element: <Save />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <SavedLocationsProvider>
      <RouterProvider router={router} />
    </SavedLocationsProvider>
  );
}