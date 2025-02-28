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
    const {selectedActivity : activity , clearSelectedActivity, loadActivity , loadingInitial} = activityStore
    const {id} = useParams()

    useEffect(()=>{
        if(id) loadActivity(id)
        return () => clearSelectedActivity()

    } , [id,loadActivity,clearSelectedActivity])

    if(!activity || loadingInitial) return <LoadingComponent/>;

    return(
           <Grid>
                <Grid.Column width={10}>
                    <ActivityDetailedHeader activity={activity}/>
                    <ActivityDetailedInfo  activity={activity}  />
                    <ActivityDetailedChat activityId={activity.id}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <ActivityDetailedSlideBar activity={activity!}/>
                </Grid.Column>
           </Grid>
    )
})