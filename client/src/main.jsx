import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import Rootlayout from './components/Rootlayout.jsx'
import Home from './components/common/Home.jsx'
import Signin from './components/common/Signin.jsx'
import Signup from './components/common/Signup.jsx'
import UserProfile from './components/user/UserProfile.jsx'
import ArticleByID from './components/common/ArticleByID.jsx'
import PostArticle from './components/author/PostArticle.jsx'
import Articles from './components/common/Articles.jsx'
import AuthorProfile from './components/author/AuthorProfile.jsx'
import AdminContext from './contexts/AdminContext.jsx'
import AdminProfile from "./components/admin/AdminProfile.jsx"
import UserList from "./components/admin/UserList.jsx"
import UserAuthorProvider from "./contexts/userAuthorContext.jsx"
import About from './components/common/About.jsx'
const browserRouterObj=createBrowserRouter([
  {
    path:"/",
    element:<Rootlayout />,
    children:[
      {
        path:"",
        element:<Home />
      },
      {
        path:"about",
        element:<About/>

      },
      {
        path:"signin",
        element:<Signin />
      },
      {
        path:"signup",
        element:<Signup />
      },
      {
        path:"user-profile/:email",
        element:<UserProfile />,
        children:[
          {
            path:"articles",
            element:<Articles />
          },
          {
            path:":articleId",
            element:<ArticleByID />
          },
          {
            path: "",
            element: <Navigate to="articles" />
          }
        ]
      },
      {
        path:"author-profile/:email",
        element:<AuthorProfile />,
        children:[
          {
            path:"articles",
            element:<Articles />
          },
          {
            path:":articleId",
            element:<ArticleByID />
          },
          {
              path:"article",
              element:<PostArticle />
          },
          {
            path: "",
            element: <Navigate to="articles" />
          }
        ]
      }, {
        path: "admin-profile/:email",
        element: <AdminProfile />,
        children: [
          {
            path: "users",
            element: <UserList />,
          },
          {
            path: "",
            element: <UserList />,
          },
        ],
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminContext>
      <UserAuthorProvider>
        <RouterProvider
          router={browserRouterObj}
          future={{
            v7_relativeSplatPath: true,
          }}
        />
      </UserAuthorProvider>
    </AdminContext>
  </StrictMode>,
) 
