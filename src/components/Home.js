import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Input } from 'semantic-ui-react';
import PollingList from "./PollingList";
import http from 'axios';
import { toast } from "react-toastify";

class Home extends Component {
  

  constructor(props){
    super(props);
    this.state = {
      username: '',
      pollings: [],
    }
    this.handlePollingItemClicked = this.handlePollingItemClicked.bind(this);
  }

  componentWillMount(){
    http.get("http://localhost:9000/polling").then((res) => {
      this.setState({pollings: res.data})
    });
  }

  handlePollingItemClicked(pollItem){
    if(!this.state.username){
      toast.error("Username can't be empty")
      return
    }
    this.props.history.push("/polling/answer/"+this.state.username+"/"+pollItem.id)
  }

  render() {
    return (
      <div>  
        <Container text textAlign="justified">
          <Header as="h2">Input your data here:</Header>
          <Input fluid icon="user" iconPosition="left" placeholder="Username" value={this.state.username} onChange={ (e) => { this.setState({username: e.target.value}) } }/>
          <Divider />          
        </Container>
        <Container text textAlign="justified">
          <Header as="h2">
            List of available pollings        
            <Button as={Link} to="/polling/create" primary floated="right">Create New Polling</Button>
          </Header>
          <Divider />          
          <PollingList pollings={this.state.pollings} onPollingItemClicked={ (pollItem) => { this.handlePollingItemClicked(pollItem) } } />
        </Container>
      </div>
    );
  }
}

export default Home;