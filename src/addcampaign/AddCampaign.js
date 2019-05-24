import React, {Component} from 'react';
import {Col, Form, FormGroup, Input, Label} from 'reactstrap';
import Button from "reactstrap/es/Button";
import * as axios from "axios";
import Container from "reactstrap/es/Container";
import Alert from "reactstrap/es/Alert";
import DatePicker from "react-datepicker/es";

class AddCampaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: {
                status: null,
                text: null
            },
            campaign: {
                name: null,
                country: null,
                budget: null,
                goal: null,
                category: null,
                startDate: new Date(),
                endDate: new Date()
            }
        };
    }

    onInputChange = (e) => {
        const {id, value} = e.target;
        this.setState(state => ({
            ...state,
            campaign: {
                ...state.campaign,
                [id]: value
            }
        }));

    };
    startDateChange = (Data) => {
        this.setState(state => ({
            ...state,
            campaign: {
                ...state.campaign,
                startDate: Data
            }
        }));
    };
    endDateChange = (Data) => {
        this.setState(state => ({
            ...state,
            campaign: {
                ...state.campaign,
                endDate: Data
            }
        }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        axios({
            url: 'http://localhost:5000/campaign',
            method: 'post',
            data: {
                campaign: this.state.campaign
            }
        }).then((res) => {
            this.setState(state => ({
                ...state,
                alert: {
                    status: true,
                    text: `'${res.data.campaign.name}' campaign has been added successfully`
                }
            }));
        }).catch(error => {
            this.setState(state => ({
                ...state,
                alert: {
                    status: false,
                    text: error.response.data
                }
            }));
        });
    };


    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="name">Name:</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="name" type="text" size="sm" onChange={this.onInputChange} required/>
                        </Col>

                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="country">Country:</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="country" type="text" size="sm" onChange={this.onInputChange} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="budget">Budget:</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="budget" type="number" min={1} size="sm" onChange={this.onInputChange} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="goal">Goal:</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="goal" type="text" size="sm" onChange={this.onInputChange} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true} inline>
                        <Col sm={2}>
                            <Label for="category">Category:</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="category" type="text" size="sm" onChange={this.onInputChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true} inline>
                        <Col sm={2}>
                            <Label for="startDate">Start Date:</Label>
                        </Col>
                        <Col sm={4}>
                            <DatePicker id={"startDate"} selected={this.state.campaign.startDate}
                                        onChange={this.startDateChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true} inline>
                        <Col sm={2}>
                            <Label for="endDate">End Date:</Label>
                        </Col>
                        <Col sm={4}>
                            <DatePicker id={"endDate"} selected={this.state.campaign.endDate}
                                        onChange={this.endDateChange}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row={true}>
                        <Col sm={3}/>
                        <Col sm={4}>
                            <Button sm={4} color={'success'}/* disabled={!this.state.validation.submit}*/>Add
                                Campaign</Button>
                        </Col>
                    </FormGroup>
                    {
                        this.state.alert.status !== null &&
                        <Alert color={this.state.alert.status === true ? 'success' : 'danger'}>
                            {this.state.alert.text}
                        </Alert>
                    }
                </Form>
            </Container>
        );
    }
}

export default AddCampaign;