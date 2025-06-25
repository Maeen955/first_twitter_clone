import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Hero from './pages/Hero.jsx';
import HomePage from './pages/HomePage.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js'
import PostFormPage from './pages/PostFormPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
const router = createBrowserRouter([
  {
    element: <App/>,
    path: '/',
    children: [
      {
        element: <HomePage/>,
        path: '/'
      },
      {
        element: <Hero/>,
        path: '/home'
      },
      {
        element: <PostFormPage/>,
        path: '/post'
      },
      {
        element: <ProfilePage/>,
        path: '/:userName'
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>

    </Provider>
  </StrictMode>,
)
