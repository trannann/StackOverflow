import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

@connect((store) => {
    return {
        domu: store.DomuReducer
    }
})

export default class Login extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        email: "",
        password: ""
      };
    }
  
    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }
  
    handleChange(event){
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit(event){
      event.preventDefault();
    }
  
    render() {
      return (
        <div className="Login">
          <div className="centered">
            <img src="src/img/logo.jpg" style={{valign:"middle", verticalAlign:"middle"}}/>
          </div>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Login</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      );
    }
  }