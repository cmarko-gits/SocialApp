import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../model/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "./ActiviityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
function App() {
  
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading , setLoading]= useState(true)
    const [submitting , setSubmitting] = useState(false)

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
      agent.Activities.list().then(response=> {
  
          const activities: Activity[] = [];
          response.forEach( activity => {
              activity.date = activity.date.split('T')[0];
              activities.push(activity);
          });
  
          setActivities(activities);
          setLoading(false)
      });
  }, []);
  
  
  
   

    const handleCreateOrEditActivity = (activity: Activity) => {

      setSubmitting(true)

      if(activity.id){

          agent.Activities.update(activity).then(()=>{

              setActivities( [...activities.filter(x => x.id !== activity.id), activity])
              setSelectedActivity(activity)
              setEditMode(false)
              setSubmitting(false)
          })

      }else{

         activity.id = uuid()
         agent.Activities.create(activity).then(()=>{
            setActivities([...activities, activity])
            setSelectedActivity(activity)
            setEditMode(false)
            setSubmitting(false)
         })

      }
 
      setEditMode(false);
      setSelectedActivity(activity);

      // Log activity for debugging purposes
      console.log(`Activity created/edited: ${JSON.stringify(activity)}`);
    };

    const handleDeleteActivity = (id:string) =>{

        agent.Activities.delete(id).then(()=>{
              setActivities([...activities.filter(x => x.id !== id)])
              setSubmitting(false)
          }
        )

    }
    
    if(loading) return <LoadingComponent content="Loading app" />

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
            submitting={submitting}
        />
        </Container>
      </Fragment>
    );
}

export default App;
