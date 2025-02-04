import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta  , Image} from "semantic-ui-react";
import { Activity } from "../model/activity";

interface Props {
    activity  : Activity,
    cancelSelectActivity : () => void
    openForm : (id : string) => void
}

export default function ActivityDetails({activity , cancelSelectActivity , openForm}:Props){
    return(
            <Card>
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
                    <Button onClick={cancelSelectActivity} basic color="grey" content="Cancel" />
                </CardContent>
           </Card>
    )
}