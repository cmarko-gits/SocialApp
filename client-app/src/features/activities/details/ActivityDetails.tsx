import { Grid, } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useEffect } from "react";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSlideBar from "./ActivittyDetailedSlidebar";



export default observer (function ActivityDetails(){

    const {activityStore} = useStore()
    const {selectedActivity : activity , loadActivity , loadingInitial} = activityStore
    const {id} = useParams()

    useEffect(()=>{
        if(id) loadActivity(id)

    } , [id,loadActivity])

    if(!activity || loadingInitial) return <LoadingComponent/>;

    return(
           <Grid>
                <Grid.Column width={10}>
                    <ActivityDetailedHeader activity={activity}/>
                    <ActivityDetailedInfo  activity={activity}  />
                    <ActivityDetailedChat/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <ActivityDetailedSlideBar/>
                </Grid.Column>
           </Grid>
    )
})