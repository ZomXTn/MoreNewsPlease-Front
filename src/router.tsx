import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Articles/Index";
import Layout from "./components/shared/Layout";
import App from "./App";
import ArticlesManagement from "./pages/Articles/ArticlesManagement";
import NewspaperManagement from "./pages/Newspapers/NewspaperManagement";
import UsersManagement from "./pages/Users/UsersManagement";
import HistoryPage from "./pages/HistoryPage";
import Registration from "./pages/Users/UserCreate";
import UserEdit from "./pages/Users/Id/UserEdit";
import UserConsult from "./pages/Users/Id/UserConsult";
import NewspaperEdit from "./pages/Newspapers/Id/NewspaperEdit";
import NewspaperCreate from "./pages/Newspapers/NewspaperCreate";
import NewspaperConsult from "./pages/Newspapers/Id/NewspaperConsult";
import ArticleCreate from "./pages/Articles/CreateArticle";
import EditArticle from "./pages/Articles/Id/EditArticle";
import ConsultArticle from "./pages/Articles/Id/ConsultArticle";
import ActivateAccount from "./pages/ActivateAccount";
import ResendActivation from "./pages/ResendActivation";
import ForgetPassword from "./pages/ForgetPassword";
import ConfirmResetPassword from "./pages/CofirmResetPassword";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/404Page";
import NewsArticle from "./pages/Articles/Id/ReadArticle";
import NoAuthPage from "./components/shared/NoAuthPage";
export const router = createBrowserRouter([
  {
    path: "*",
    element: <Layout>
      <NotFoundPage />
    </Layout>
  },
  {
    path: "/",
    element: <NoAuthPage><App /></NoAuthPage>,
  },
  {
    path: "/favorites",
    element: <Layout>
      <Index favorite />
    </Layout>,
  },
  {
    path: "/articles",
    children: [
      {
        path: "",
        element: <Layout>
          <Index />
        </Layout>,
      },
      {
        path: ":id/read",
        element: <Layout>
          <NewsArticle />
        </Layout>,
      }
    ]

  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Layout>
      <Profile />,
    </Layout>
  },
  {
    path: "/activate/:uid/:token",
    element: <NoAuthPage><ActivateAccount /></NoAuthPage>,
  },
  {
    path: "/confirm-reset/:uid/:token",
    element: <NoAuthPage><ConfirmResetPassword /></NoAuthPage>,
  },
  {
    path: "/resend-activation/",
    element: <NoAuthPage><ResendActivation /></NoAuthPage>,
  },
  {
    path: "/forgot-password/",
    element:
      <NoAuthPage><ForgetPassword /></NoAuthPage>
  },
  {
    path: "/history",
    element: <Layout>
      <HistoryPage />
    </Layout>,
  },
  {
    path: "/management",
    children: [
      {
        path: "users/",
        children: [
          {
            path: "",
            element: <Layout adminOnly>
              <UsersManagement />
            </Layout>,
          },
          {
            path: "create/",
            element: <Layout adminOnly>
              <Registration />
            </Layout>,
          },
          {
            path: ":id/edit/",
            element: <Layout adminOnly>
              <UserEdit />
            </Layout>,
          },
          {
            path: ":id/consult/",
            element: <Layout adminOnly>
              <UserConsult />
            </Layout>,
          }
        ],
      },
      {
        path: "articles/",
        children: [
          {
            path: "",
            element: <Layout adminOnly>
              <ArticlesManagement />
            </Layout>,
          },
          {
            path: "create/",
            element: <Layout adminOnly>
              <ArticleCreate />
            </Layout>,
          },
          {
            path: ":id/edit/",
            element: <Layout adminOnly>
              <EditArticle />
            </Layout>,
          },
          {
            path: ":id/consult/",
            element: <Layout adminOnly>
              <ConsultArticle />
            </Layout>,
          }
        ]
      },
      {
        path: "newspapers/",
        children: [
          {
            path: "",
            element: <Layout adminOnly>
              <NewspaperManagement />
            </Layout>,
          },
          {
            path: "create/",
            element: <Layout adminOnly>
              <NewspaperCreate />
            </Layout>,
          },
          {
            path: ":id/edit/",
            element: <Layout adminOnly>
              <NewspaperEdit />
            </Layout>,
          },
          {
            path: ":id/consult/",
            element: <Layout adminOnly>
              <NewspaperConsult />
            </Layout>,
          },
        ],
      },

    ],

  }
]);