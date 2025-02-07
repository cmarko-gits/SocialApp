import { Button, Container, Header, Segment , Image} from "semantic-ui-react";
import { Link } from 'react-router';

export default function HomePage(){
    return(
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image size='massive' src='/assets/logo.png' alt='Logo' style={{marginBotton:12}}/>
                    Reactivities
                </Header>
                <Header as='h2' inverted content='Welcome to Reactivities'/>
                <Button as={Link} to='activities' size="huge" inverted>
                    Take me to the Activities!
                </Button>
            </Container>
        </Segment>

    )
}