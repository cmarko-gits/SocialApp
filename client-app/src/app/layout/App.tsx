import { Fragment, useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import ActivityDashboard from "./ActiviityDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";
function App() {
  
    const  {activityStore} = useStore()

    useEffect(() => {
      activityStore.loadingActivities()
  }, [activityStore]);
  
    if(activityStore.loadingInitial) return <LoadingComponent content="Loading app" />

    return (
      <Fragment>
        <Navbar />
          <Container style={{ marginTop: "7em" }}>
            <ActivityDashboard/>
          </Container>
      </Fragment>
    );
}

export default observer(App);
