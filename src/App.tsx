import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css'
import AuthLayout from './Layout/AuthLayout/AuthLayout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MainLayout from './Layout/MainLayout/MainLayout';
import NewsFeed from './pages/NewsFeed/NewsFeed';
import Notification from './pages/Notification/Notification';
import Profile from './pages/Profile/Profile';
import Notfound from './component/Notfound/Notfound';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './context/AuthContext';
import { UserContextProvider } from './context/userDataContext';
import ProtectedRoute from './component/protectedRoute/ProtectedRoute';
import AuthProtected from './component/AuthPtotected/AuthProtected';
import PostDetails from './pages/postDetails/PostDetails';
import { Offline } from "react-detect-offline"
import ChangePassword from './pages/ChangePassword/ChangePassword';

const route = createBrowserRouter([
  {
    path: 'auth', element: <AuthProtected><AuthLayout /></AuthProtected>, children: [
      { index: true, element: <Navigate to={'/login'} /> },
      { path: 'login', element: <Login /> },
      { path: 'Register', element: <Register /> }
    ]
  },
  {
    path: '', element: <ProtectedRoute><MainLayout /></ProtectedRoute>, children: [
      { index: true, element: <Navigate to={'/Feed'} /> },
      { path: 'Feed', element: <NewsFeed /> },
      { path: 'Notification', element: <Notification /> },
      { path: 'postDetails/:postId', element: <PostDetails /> },
      { path: 'Profile', element: <Profile /> },
      { path: 'change-password', element: <ChangePassword /> }
    ]
  },
  { path: '*', element: <Notfound /> }
],
{
  basename:"/socialApp"
})

function App() {

  return (
    <>
      <AuthContextProvider>
        <UserContextProvider>
          <RouterProvider router={route} />
          <ToastContainer />
        </UserContextProvider>
      </AuthContextProvider>
      <Offline>You Are Offline Now...!</Offline>
    </>
  )
}

export default App