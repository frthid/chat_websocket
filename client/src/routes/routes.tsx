import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import ChatPage from '../pages/ChatPage/ChatPage';
import LoginPage from '../pages/LoginPage/LoginPage';

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<LoginPage />} />
      <Route path='/chat' element={<ChatPage />} />
    </Route>
  )
);
