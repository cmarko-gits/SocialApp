import {  useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/models/ModalContainer";
function App() {
  
    const location = useLocation()

    const {userStore , commonStore} = useStore()

    useEffect(()=>{
      if(commonStore.token){
        userStore.getUser().finally(()=> commonStore.setAppLoaded())
      }else{
        commonStore.setAppLoaded()
      }
    }, [commonStore, useStore])

    if(!commonStore.appLoaded) return <LoadingComponent content="Loading app .." />

    return (
      <>

        <ModalContainer/>
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
