import { observer } from "mobx-react-lite";
import { Reveal, Button } from "semantic-ui-react";
import { Profile } from "../../app/model/profile";
import { useStore } from "../../app/store/store";
import { SyntheticEvent } from "react";

interface Props{
    profile:Profile
}

export default observer(function FollowButton({profile}:Props){

    const {profileStore,userStore} = useStore()
    const { updateFollowing, loading } = profileStore;

    if(userStore.user?.username === profile.username) return null;

    function handleFollowButton(e: SyntheticEvent, username: string) {
        e.preventDefault();
        updateFollowing(username, !profile.following);
    }
    

    return(
        <Reveal animated="move">
              <Reveal.Content visible style={{width:'100%'}}>
                            <Button 
                                fluid
                                color={'teal'}
                                content={profile.following ? 'Unfollow' : 'Follow'}
                            />
                        </Reveal.Content>
                        <Reveal.Content hidden style={{width:'100%'}}>
                            <Button 
                                fluid
                                loading={loading}
                                color={profile.following ? 'red' : 'green'}
                                content={profile.following ? 'Unfollow' : 'Follow'}
                                onClick={(e)=> handleFollowButton(e,profile.username)}
                          />
                        </Reveal.Content>
                    </Reveal>
    )
})