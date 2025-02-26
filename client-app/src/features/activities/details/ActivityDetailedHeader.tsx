import React from 'react';
import { Button, Header, Item, Segment, Image, Label } from 'semantic-ui-react';
import { Link } from 'react-router'; // Corrected import
import { observer } from 'mobx-react-lite';
import { Activity } from '../../../app/model/activity';
import { format } from 'date-fns';
import { useStore } from '../../../app/store/store';

const activityImageStyle = {
  filter: 'brightness(30%)'
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

interface Props {
  activity: Activity;
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
  const formattedDate =
    activity.date && !isNaN(new Date(activity.date).getTime())
      ? format(new Date(activity.date), 'dd MMM yyyy')
      : 'No Date Available';

  const { activityStore: { updateAttence, loading , cancleActivityToggle} } = useStore();

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{padding:'0'}}>
        {activity.isCancelled && 
          <Label style={{position:'absolute' , zIndex:1000,left:-14,top:20}}  ribbon color='red' content='Cancelled'/>
        }
      </Segment>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: 'white' }}
                />
                <p>{formattedDate}</p>
                <p>
                  Hosted by <strong>{activity.host?.dispalayName}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <>
          <Button color={activity.isCancelled ? 'green' : 'red'} onClick={cancleActivityToggle} floated='left' basic content={activity.isCancelled ? 'Re-active Activity' : 'Cancle Activity'}/>
          <Button color="orange" disabled={activity.isCancelled} floated="right" as={Link} to={`/manage/${activity.id}`}>
            Manage Event
          </Button>
          </>) : activity.isGoing ? (
          <Button loading={loading} onClick={updateAttence}>Cancel attendance</Button>
        ) : (
          <Button onClick={updateAttence} disabled={activity.isCancelled} loading={loading} color="teal">Join Activity</Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
