import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta  , Image} from "semantic-ui-react";
import { useStore } from "../store/store";
import LoadingComponent from "./LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router";
import { useEffect } from "react";



export default observer (function ActivityDetails(){

    const {activityStore} = useStore()
    const {selectedActivity : activity , loadActivity , loadingInitial} = activityStore
    const {id} = useParams()

    useEffect(()=>{
        if(id) loadActivity(id)

    } , [id,loadActivity])

    if(!activity || loadingInitial) return <LoadingComponent/>;

    return(
            <Card fluid>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
                <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span className='date'>{activity.date}</span>
                </CardMeta>
                <CardDescription>
                   {activity.description}
                </CardDescription>
                </CardContent>
                <CardContent extra>
                    <Button as={Link} to={`/manage/${id}`}  basic color="blue" content="Edit" />
                    <Button as={Link} to={'/activities'} basic color="grey" content="Cancel" />
                </CardContent>
           </Card>
    )
})