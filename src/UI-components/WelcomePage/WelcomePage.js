import './WelcomePage.css';
import React from 'react';


const WelcomePage = () => {
    return(
        <div className="welcome-page">
                    <h1 className="welcome-heading">welcome to <span className="moods">Moods</span> where you can listen to music according to your mood</h1>
                    <a className="login-link"
                     href ="http://localhost:8888/login">
                        <button className="btn btn-dark login-btn">login with spotify</button>
                    </a>
        </div>
    )
}

export default WelcomePage;


