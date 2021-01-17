import './WelcomePage.css';
import React, {Fragment} from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const WelcomePage = () => {
    return(
        <Fragment>
                <Container maxWidth="sm"
                className="container">
                    <h1 className="welcome-heading">welcome to <span className="moods">Moods</span> where you can listen to music according to your mood</h1>
                    <a className="login-link"
                     href ="http://localhost:8888/login">
                        <Button variant="contained" color="secondary" className="login-btn">
                            Login With Spotify
                        </Button>
                    </a>
                </Container>
        </Fragment>
    )
}

export default WelcomePage;


