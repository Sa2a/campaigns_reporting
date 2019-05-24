import React from 'react';
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import AddCampaign from "../addcampaign/AddCampaign";
import CampaignReporting from "../reporting/CampaignReporting";
//#007bff

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: 'AddCampaign',
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div>
                <Nav className="mr-auto" tabs style={{
                    paddingTop: 20, paddingLeft: 20, padBottom: 15,
                    color: "#fbfbff"
                }}>
                    <NavItem>
                        <NavLink style={{
                            backgroundColor: this.state.activeTab === 'AddCampaign' ?  '#6881b5' : '#007bff',
                            color: 'white'
                        }}
                                 className={classnames({active: this.state.activeTab === 'AddCampaign'})}
                                 onClick={() => {
                                     this.toggle('AddCampaign');
                                 }}>
                            Add Campaign
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{
                            backgroundColor: this.state.activeTab === 'CampaignReporting' ?  '#6881b5' : '#007bff',
                            color: 'white'
                        }}
                                 className={classnames({active: this.state.activeTab === 'CampaignReporting'})}
                                 onClick={() => {
                                     this.toggle('CampaignReporting');
                                 }}
                        >
                            Campaign Reporting
                        </NavLink>
                    </NavItem>

                </Nav>
                <TabContent activeTab={this.state.activeTab} style={{backgroundColor: "#6881b5", paddingTop: 20,color:'white'}}>

                    <TabPane tabId="AddCampaign">
                        <AddCampaign/>
                    </TabPane>
                    <TabPane tabId="CampaignReporting">
                        <CampaignReporting/>
                    </TabPane>


                </TabContent>
            </div>
        );
    }
}