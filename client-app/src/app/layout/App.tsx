/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../model/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "./ActiviityDashboard";
import { v4 as uuid } from "uuid";
function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    const handleSelectedActivity = (id: string) => {
      setSelectedActivity(activities.find((x) => x.id === id));
    };

    const handleCancelSelectActivity = () => {
      setSelectedActivity(undefined);
    };

    const handleFormOpen = (id?: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      id ? handleSelectedActivity(id) : handleCancelSelectActivity();
      setEditMode(true);
    };

    const handleFormClose = () => {
      setEditMode(false);
    };

    useEffect(() => {
      axios
        .get<Activity[]>("http://localhost:5000/Activities")
        .then((response) => {
          console.log(response.data); // Pogledaj u konzoli kakav je odgovor API-ja
          setActivities(response.data);
        })
        .catch((error) => console.error("Error fetching activities:", error));
    }, []);

    const handleCreateOrEditActivity = (activity: Activity) => {
      setActivities(activity.id 
          ? [...activities.filter(x => x.id !== activity.id), activity]
          : [...activities, {...activity , id : uuid()}]);

      setEditMode(false);
      setSelectedActivity(activity);

      // Log activity for debugging purposes
      console.log(`Activity created/edited: ${JSON.stringify(activity)}`);
    };

    const handleDeleteActivity = (id:string) =>{
        setActivities([...activities.filter(x => x.id !== id)])
    }
  
    return (
      <Fragment>
        <Navbar openForm={handleFormOpen}/>
        <Container style={{ marginTop: "7em" }}>
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectedActivity}
            selectedActivity={selectedActivity}
            cancelSelectedActivity={handleCancelSelectActivity}
            openForm={handleFormOpen}
            closeForm={handleFormClose} editMode={editMode} 
            createOrEdit={handleCreateOrEditActivity}
            deleteActivity={handleDeleteActivity}
        />
        </Container>
      </Fragment>
    );
}

export default App;
