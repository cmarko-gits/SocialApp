import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../app/store/store";
import ActivityList from "./ActivityList";
import ActivityFiliters from "./ActivityFilters";

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
                 <ActivityFiliters/>
            </Grid.Column>
        </Grid>
    )
})