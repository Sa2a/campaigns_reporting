import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Collapse, Media, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from 'reactstrap';


class Header extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            dropdownOpen: false,

        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
            dropdownOpen: !this.state.dropdownOpen

        });
    }

    /*
        loginT(e){this.props.toggleLogin();}
    */

//
    render() {

        return (
            <div style={{backgroundColor: "#353992"}}>
                <Navbar light expand="md" style={{paddingTop: 20}}>

                    <NavbarBrand>
                        <Media style={{color:'orange'}} href={'#'}>
                                Campaigns Reporting
                        </Media>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>

                        {this.getNav()}
                    </Collapse>
                </Navbar>


            </div>
        );
    }

    getNav() {
        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <Link to="#">
                        <Button color='primary'>Home</Button>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="#">
                        <Button color='primary'>About US</Button>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="#">
                        <Button color='primary'>Services</Button>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="#">
                        <Button color='primary'>Contact US</Button>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                </NavItem>
            </Nav>
        );

    }


}

export default Header;
