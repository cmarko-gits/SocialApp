/* eslint-disable react-refresh/only-export-components */
import { Button, Container, Menu } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { useStore } from "../store/store";

export default function Navbar() {

    const  {activityStore} = useStore()

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="Logo" style={{ marginRight: "10px" }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button onClick={()=>activityStore.openForm()} positive content="Create Activity" /> {/* Izmenjeno */}
                </Menu.Item>
            </Container>
        </Menu>
    );
}
