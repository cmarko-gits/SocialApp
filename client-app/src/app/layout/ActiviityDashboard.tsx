import { Grid } from "semantic-ui-react";
import { Activity } from "../model/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";

interface Props {
    activities : Activity[],
    selectedActivity : Activity | undefined , 
    selectActivity : (id : string) => void,
    cancelSelectedActivity : () => void , 
    editMode : boolean , 
    openForm : (id:string) => void, 
    closeForm : () => void,
    createOrEdit : (activity:Activity) => void,
    deleteActivity : (id:string) => void,
    submitting : boolean
}

export default function   ActivityDashboard({activities , submitting , selectActivity , selectedActivity , cancelSelectedActivity, editMode , closeForm , openForm,createOrEdit , deleteActivity} : Props){
    return(
        <Grid>
            <Grid.Column width='6'>
                <ActivityList activities={activities} selectedActivity={selectActivity} deleteActivity={deleteActivity}  submitting={submitting} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectedActivity} openForm={openForm}/>  }
                {editMode &&
                <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit}  submitting={submitting}/>}
            </Grid.Column>
        </Grid>
    )
}