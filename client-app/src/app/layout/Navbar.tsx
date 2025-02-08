/* eslint-disable react-refresh/only-export-components */
import { Button, Container, Menu } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { NavLink } from "react-router";

export default function Navbar() {


    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="Logo" style={{ marginRight: "10px" }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities" />
                <Menu.Item as={NavLink} to='/errors' name="Errors" />
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content="Create Activity" /> {/* Izmenjeno */}
                </Menu.Item>
            </Container>
        </Menu>
    );
}
