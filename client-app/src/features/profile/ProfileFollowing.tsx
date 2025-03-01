import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import { Grid, Header, Tab } from "semantic-ui-react";
import ProfileCard from "./profileCard";


export default observer(function ProfileFollowing() {
    const { profileStore } = useStore();
    const { profile, followings, loadingFollowings , activeTab } = profileStore;

    return (
        <Tab.Pane loading={loadingFollowings}>
            <Grid.Column width={16}>
                <Header floated='left' icon='user'
                content={activeTab===3  ? `People following ${profile?.displayName}` : `People ${profile?.displayName} is following`}/>
            </Grid.Column>
            <Grid.Column width={16}>
                {followings.map(profile => (
                    <ProfileCard key={profile.username} profile={profile} />
                ))}
            </Grid.Column>
        </Tab.Pane>
    );
});

