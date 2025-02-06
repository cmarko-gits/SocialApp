import {createBrowserRouter, RouteObject} from 'react-router-dom'
import App from '../layout/App'
import HomePage from '../layout/home/HomePage'
import ActiviityDashboard from '../layout/ActiviityDashboard'
import ActivityForm from '../layout/ActivityForm'
import ActivityDetails from '../layout/ActivityDetails'

export const routes : RouteObject[] = [

    {
        path : '/',
        element: <App/>,
        children : [
            {path : '' , element : <HomePage/>} ,
            {path : 'activities' , element : <ActiviityDashboard/>,},
            {path : 'activities/:id' , element : <ActivityDetails/>,},
            {path : 'createActivity' , element : <ActivityForm key='create'/>},
            {path : 'manage/:id' , element : <ActivityForm key='manage'/>},
        ]
    }

]

export const router = createBrowserRouter(routes)