import { observer } from "mobx-react-lite";
import { Profile } from "../../app/model/profile";
import { Card  , Icon, Image} from "semantic-ui-react";
import { Link } from "react-router";

interface Props{
    profile:Profile
}

export default observer(function ProfileCard({profile}:Props){
    return(
        <Card as={Link} to={`/profile/${profile.username}`}>
            <Image src={profile.image || '/assets/user.png'} />
            <Card.Content>
                <Card.Header>
                    {profile.dispalayName}
                </Card.Header>
                <Card.Description>
                    Bio
                </Card.Description>
            </Card.Content>
            <Card.Content>
                <Icon name="user"/>
                20 followers
            </Card.Content>
        </Card>
    )
})