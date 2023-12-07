import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import LoginPage from '../pages/LoginPage/LoginPage';
// import AuthRoute from '../helpers/AuthRoute';
import ChatPage from '../pages/ChatPage/ChatPage';


export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<LoginPage />} />
      {/* <Route path='/chat' element={<AuthRoute />} /> */}
      <Route path='/chat' element={<ChatPage />} />
    </Route>
  )
);
