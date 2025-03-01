import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { Profile } from "../../app/model/profile";
import { observer } from "mobx-react-lite";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowing from "./ProfileFollowing";
import { useStore } from "../../app/store/store";

interface Props{
    profile : Profile
}

export default observer(function ProfileContent({profile}:Props){

    const {profileStore} = useStore()

    const panes = [
        {menuItem:"About" , render:()=><Tab.Pane><ProfileAbout/></Tab.Pane>},
        {menuItem:"Photos" , render:()=><ProfilePhotos profile={profile}/>},
        {menuItem:"Events" , render:()=><Tab.Pane>Events Content</Tab.Pane>},
        {menuItem: "Followers", render: () => <Tab.Pane><ProfileFollowing  /></Tab.Pane>},
        {menuItem: "Following", render: () => <Tab.Pane><ProfileFollowing  /></Tab.Pane>},
        
    ]

    return(
        <Tab 

            menu={{fluid:true,vertical:true}}
            menuPosition="right"
            panes={panes}
            onTabChange={(e,data)=> profileStore.setActiveTab(data.activeIndex as number)}
        />
    )
})