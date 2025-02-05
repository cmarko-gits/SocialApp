import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";

export default observer(function   ActivityDashboard(){

    const  {activityStore} = useStore()
    const  {selectedActivity , editMode } = activityStore

    return(
        <Grid>
            <Grid.Column width='6'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails />  }
                {editMode &&
                <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})