import { observer } from "mobx-react-lite";
import { List , Image, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/model/profile";
import { Link } from "react-router";
import ProfileCard from "../../profile/profileCard";

interface Props{
    attendees : Profile[]
}

export default observer(function ActivityListItemAttendee({ attendees  }: Props) {
    console.log(attendees)
    return (
        <List horizontal>
            {attendees.map(attendee => (
                <Popup hoverable key={attendee.username} trigger={
                        <List.Item key={attendee.username} as={Link}  to={`/profiles/${attendee.username}`}>
                            <Image size="mini" circular src={attendee.image || '/assets/user.png'} />

                        </List.Item>
                    }>
                    
                    <Popup.Content>
                        <ProfileCard profile={attendee}/>
                    </Popup.Content>
                </Popup>
           
            ))}
        </List>
    );
});
