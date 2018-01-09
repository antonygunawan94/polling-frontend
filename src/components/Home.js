import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Input } from 'semantic-ui-react';
import PollingList from "./PollingList";

import http from 'axios';

class Home extends Component {
  state = { 
    username: '',
    pollings: [],
  }

  componentWillMount(){
    http.get("http://localhost:9000/polling").then((res) => {
      console.log(res.data);
      this.setState({pollings: res.data})
    });
  }

  render() {
    return (
      <div>  
        <Container text textAlign="justified">
          <Header as="h2">Input your data here:</Header>
          <Input fluid icon="user" iconPosition="left" placeholder="Username"/>
          <Divider />          
        </Container>
        <Container text textAlign="justified">
          <Header as="h2">
            List of available pollings        
            <Button as={Link} to="/polling/create" primary floated="right">Create New Polling</Button>
          </Header>
          <Divider />          
          <PollingList pollings={this.state.pollings} />
        </Container>
      </div>
    );
  }
}

export default Home;