import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import App from '../layout/App';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActiviityDashboard from '../../features/activities/dashboard/ActiviityDashboard';
import TestErrors from '../errors/TestError';
import NotFound from '../errors/NotFound';
import ServerError from '../errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import ProfilePage from '../../features/profile/profilePage';
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActiviityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetails /> },
            { path: 'createActivity', element: <ActivityForm key='create' /> },
            { path: 'manage/:id', element: <ActivityForm key='manage' /> },
            { path: 'profiles/:username', element: <ProfilePage /> },
            { path : 'errors' , element : <TestErrors/>},
            { path : 'login' , element : <LoginForm/>},
            { path : 'not-found' , element : <NotFound/>},
            { path : 'server-error' , element : <ServerError/>},
            { path : '*' , element : <Navigate replace to='/not-found'/>}
        ]
    }
];

export const router = createBrowserRouter(routes);
