import React, { Component } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

class FormSignup extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
        let isSubmitted = false;
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value)
        this.setState(

            { [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(name, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (name) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' Please enter valid email';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;

        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
        console.log(this.state);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    error(er) {
        return er.length === 0 ? "" : "has-error"
    }


    submit() {
        this.isSubmitted = !this.isSubmitted;
        console.log(this.isSubmitted);

    }

    render() {

        return (
            <div className="main">
                <Container fluid="sm">
                    <Row className="justify-content-md-center">
                        <Col>
                            <div>
                                <h3>Login</h3>
                            </div>
                            <Form className="form-wrapper">
                                <div className="email" >
                                    <Form.Group controlId="formBasicEmail" >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email"
                                            className={this.error(this.state.formErrors.email)}
                                            placeholder="Enter email"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleUserInput} />
                                        <Form.Text className="text-muted">
                                            {this.state.formErrors.email}
                                        </Form.Text>

                                    </Form.Group>
                                </div>
                                <div className="password" >
                                    <Form.Group controlId="formBasicPassword" >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password"
                                            className={this.error(this.state.formErrors.password)}
                                            placeholder="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleUserInput} />
                                        <Form.Text className="text-muted">
                                            {this.state.formErrors.password}
                                        </Form.Text>
                                    </Form.Group>
                                </div>
                                <div className="checkbox">
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Remember me" />
                                    </Form.Group>
                                </div>
                                <div>
                                    <Button className="btn1"
                                        variant="primary"
                                        type="submit"
                                        onClick={this.submit()}
                                        disabled={!this.state.formValid}>
                                        Submit
                                </Button>
                                </div>
                            </Form>

                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }

}
export default FormSignup
