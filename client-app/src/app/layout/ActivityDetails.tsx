import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta  , Image} from "semantic-ui-react";
import { useStore } from "../store/store";
import LoadingComponent from "./LoadingComponent";



export default function ActivityDetails(){

    const {activityStore} = useStore()
    const {selectedActivity : activity , cancelSelectedActivity , openForm} = activityStore

    if(!activity) return <LoadingComponent/>;

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
                    <Button onClick={()=> openForm(activity.id)}  basic color="blue" content="Edit" />
                    <Button onClick={cancelSelectedActivity} basic color="grey" content="Cancel" />
                </CardContent>
           </Card>
    )
}