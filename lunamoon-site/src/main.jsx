import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { MainPage } from './Apps/Main-page/App'
import { Header } from './Apps/elements/Header';
import { ErrorPage } from './Apps/Error-page/App';
import { BanListPage } from './Apps/Banlist-page/App';
import { AdminPage } from './Apps/Admin-page/App';
import { QuestionPage } from './Apps/Question-Page/App';
import { AdmPage } from './Apps/Admin-page/App1';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <><Header /><MainPage /></>
  },
  {
    path: "/banlist",
    element: <><Header /><BanListPage /></>
  },
  {
    path: "/admin",
    element: <><Header /><AdmPage /></>
  },
  {
    path: "/faq",
    element: <><Header /><QuestionPage /></>
  }
])

createRoot(document.getElementById('root')).render(
  <>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </>
)