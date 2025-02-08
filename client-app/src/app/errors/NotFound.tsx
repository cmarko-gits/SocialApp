import { Link } from "react-router";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound(){
    return(
        <Segment>
            <Header name="search">
                <Icon name="search"/>
                Ooops - we've looked everywhere but could not find what you are looking for!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities'>
                    Return to Activities page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}