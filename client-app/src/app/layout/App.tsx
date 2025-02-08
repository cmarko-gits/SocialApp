import {  useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";
function App() {
  
    const  {activityStore} = useStore()

    useEffect(() => {
      activityStore.loadingActivities()
  }, [activityStore]);
  
    if(activityStore.loadingInitial) return <LoadingComponent content="Loading app" />

    return (
      <>

        <ToastContainer position="bottom-right" hideProgressBar theme="colored" />

        {location.pathname === '/' ? <HomePage/>  : (

            <>
      
                <Navbar />
                <Container style={{marginTop:'7em'}}>
                    <Outlet/>
                </Container>
            </>

        )}

      
      </>
      
    );
}

export default observer(App);
