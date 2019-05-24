import React from 'react';
import './css/App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./Header";
import Container from "reactstrap/es/Container";
import CampaignTabs from "./tabs/CampaignTabs";

function App() {
    return (
        <Router>
                <Header/>
            <div className="body">
                <Container>
                    <CampaignTabs/>
                </Container>
            </div>
        </Router>
    );
}

export default App;
