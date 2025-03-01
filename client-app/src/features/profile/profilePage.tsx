import { Grid } from "semantic-ui-react";
import ProfileHeader from "./profileHeader";
import ProfileContent from "./profileContent";
import { useParams } from "react-router";
import { useStore } from "../../app/store/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function ProfilePage(){
    const  {username} = useParams<{username:string}>()
    const {profileStore} = useStore()
    const {loadProfile , loadingProfile , profile , setActiveTab} = profileStore

    useEffect(()=>{
        loadProfile(username!)
        return() =>{
            setActiveTab(0)
        }

    }, [loadProfile , username])

    if(loadingProfile) <LoadingComponent content="Loading profile ..."/>

    return(
        <Grid>
            <Grid.Column width={16}>


                {profile && 
                <>

                    <ProfileHeader profile={profile}/>
                    <ProfileContent profile={profile}/>
                </>}
                

            </Grid.Column>
        </Grid>
    )
}