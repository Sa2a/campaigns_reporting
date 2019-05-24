import React, {Component} from 'react';
import Multiselect from 'react-widgets/lib/Multiselect'
import Container from "reactstrap/es/Container";
import {Col, Form, FormGroup, Label} from "reactstrap";
import DatePicker from "react-datepicker/es";
import Alert from "reactstrap/es/Alert";
import * as axios from "axios";
import ReportChart from "./ReportChart";
import Button from "reactstrap/es/Button";
import Row from "reactstrap/es/Row";
import FormText from "reactstrap/es/FormText";

let campaignFields = [
    {id: 'name', name: 'Name'},
    {id: 'country', name: 'Country'},
    {id: 'budget', name: 'Budget'},
    {id: 'goal', name: 'Goal'},
    {id: 'category', name: 'Category'},
    {id: 'startDate', name: 'Start Date'},
    {id: 'endDate', name: 'End Date'}
];

export default class CampaignReporting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: {
                status: null,
                text: null
            },
            statisticsComponent: null,
            dimensions: [],
            fields: [],
            duration: {
                startDate: new Date(),
                endDate: new Date()
            }

        }
    }

    startDateChange = (Data) => {
        this.setState(state => ({
            ...state,
            duration: {
                ...state.duration,
                startDate: Data
            }
        }));
    };
    endDateChange = (Data) => {
        this.setState(state => ({
            ...state,
            duration: {
                ...state.duration,
                endDate: Data
            }
        }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.dimensions.length === 0 || this.state.dimensions.length > 2) {
            this.setState(state => ({
                ...state,
                alert: {
                    status: false,
                    text: 'Dimensions field should be at least one choice and maximum 2'
                }
            }));
        } else {
            let newFields = Object.assign([], this.state.fields);
            newFields = newFields.concat(this.state.dimensions);
            let uniqueFields = [...new Set(newFields)];

            axios.get('http://localhost:5000/campaign', {
                params: {
                    dimensions: this.state.dimensions,
                    fields: uniqueFields,
                    duration: this.state.duration
                }
            }).then((res) => {
                this.setState({
                    statisticsComponent: null
                });
                this.setState(state => ({
                    ...state,
                    alert: {
                        status: true,
                        text: 'success'
                    },
                    statisticsComponent:
                        <ReportChart results={res.data.results} dimensions={this.state.dimensions}/>

                }));
            }).catch(error => {
                error.response ?
                    this.setState(state => ({
                        ...state,
                        alert: {
                            status: false,
                            text: error.response.data
                        }
                    })) :
                    this.setState(state => ({
                        ...state,
                        alert: {
                            status: false,
                            text: error
                        }
                    }));
            });
        }
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="dimensions">Dimensions:</Label>
                        </Col>
                        <Col sm>
                            <Multiselect
                                id={'dimensions'}
                                data={campaignFields}
                                valueField='id'
                                textField='name'
                                onChange={selectedItems => {
                                    this.setState({dimensions: selectedItems});
                                }}
                            />
                            <FormText color={'gray'}>At least 1 choice and maximum 2</FormText>
                        </Col>

                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="fields">Fields:</Label>
                        </Col>
                        <Col sm>
                            <Multiselect
                                id={'fields'}
                                data={campaignFields}
                                valueField='id'
                                textField='name'
                                onChange={selectedItems => {
                                    this.setState({fields: selectedItems});
                                }}
                            />
                            <FormText color={'gray'}>Dimensions fields are added by default.</FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true} inline>
                        <Col sm={2}>
                            <Label for="startDate">Start Date:</Label>
                        </Col>
                        <Col sm={4}>
                            <DatePicker id={"startDate"} selected={this.state.duration.startDate}
                                        onChange={this.startDateChange} required/>
                        </Col>
                        <Col sm={2}>
                            <Label for="endDate">End Date:</Label>
                        </Col>
                        <Col sm={4}>
                            <DatePicker id={"endDate"} selected={this.state.duration.endDate}
                                        onChange={this.endDateChange} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={3}/>
                        <Col sm="12" md={{size: 6, offset: 3}}>
                            <Button sm={4} style={{backgroundColor: '#0f9107'}}>Show Report</Button>
                        </Col>
                    </FormGroup>
                    {
                        this.state.alert.status === false &&
                        <Alert color={'danger'}>
                            {this.state.alert.text}
                        </Alert>
                    }
                </Form>

                <Row>
                    <Col sm="12" md={{size: 6, offset: 3}} style={{paddingBottom: 20}}>
                        {this.state.statisticsComponent}
                    </Col>
                </Row>
            </Container>
        )
    }
}