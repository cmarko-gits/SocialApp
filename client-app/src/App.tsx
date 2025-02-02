/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]); // useState unutar komponente

  useEffect(() => {
    axios.get("http://localhost:5000/Activities")
      .then(response => {
        console.log(response.data); // Pogledaj u konzoli kakav je odgovor API-ja
        setActivities(response.data);
      })
      .catch(error => console.error("Error fetching activities:", error));
  }, []);
  

  return (
      <div><Header as="h2" icon='users' content="Reactivities" />  <List>
      {activities.map((activity: any) => (
        <List.Item key={activity.id}>
          <h3>{activity.title}</h3>
          <p>{activity.description}</p>
          <p>{activity.city} - {activity.venue}</p>
          <p>{new Date(activity.date).toLocaleDateString()}</p>
        </List.Item>
      ))}

    </List></div>

   
  );
}

export default App;
