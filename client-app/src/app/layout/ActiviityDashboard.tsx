import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/store";
import { useEffect } from "react";

export default observer(function   ActivityDashboard(){

    const {activityStore} = useStore()
    const {activityRegistry , loadingActivities} = activityStore

    useEffect(()=>{
        if(activityRegistry.size <= 1) loadingActivities()
    } ,  [activityRegistry.size])

    return(
        <Grid>
            <Grid.Column width='6'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
})