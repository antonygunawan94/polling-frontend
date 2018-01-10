import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Header } from "semantic-ui-react";
import http from "axios";
import { toast } from "react-toastify";

class PollingAnswer extends Component {

  constructor(props){
    super(props)
    this.state = {
      isLoaded: false,
      isAnswered: false,
      polling: null,
      polling_user_answers: null,
      selectedAnswer: null,
      customAnswer: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    http.get("http://localhost:9000/polling/" + this.props.match.params.id)
      .then((res) => {
        const data = res.data.data
        this.setState({
          polling: data.polling,
          polling_user_answers: data.polling_user_answers,
          isLoaded: true
        })
        this.state.polling_user_answers.forEach((pua) => {
          if(pua.username == this.props.match.params.username){
            this.setState({ isAnswered: true })
          }
        })
      })
      .catch((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_CENTER
        })
      })
  }

  handleChange(e, res){
    this.setState({selectedAnswer: res.value})
  }

  handleClick(e){
    const polling_id = this.props.match.params.id
    const selectedAnswer = this.state.selectedAnswer;

    if(!selectedAnswer){
      toast.error("Please select your answer", {
        position: toast.POSITION.TOP_CENTER
      })
    }else{
      let username = this.props.match.params.username
      let data = {
        "polling_id": polling_id,
        "polling_defined_answer_id": (this.state.customAnswer) ? -1 : selectedAnswer.id,
        "username": username,
        "custom_answer": this.state.customAnswer
      }
      http.post("http://localhost:9000/polling/answer/"+polling_id, JSON.stringify(data))
        .then(res => {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER
          })
          this.setState({isAnswered: true})
        })
        .catch(error => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER
          })
        })
    }
  }

  renderPollingDefinedAnswers(){
    return this.state.polling.polling_defined_answers.map(pda =>{
      return(
        <Form.Radio 
          label={pda.answer} 
          value={pda}
          key={pda.id} 
          checked={this.state.selectedAnswer===pda} 
          onChange={this.handleChange} />
      )
    })
  }

  renderPollingState(){
    if (this.state.isAnswered){
      return(
        <div>
          <p> Polling is already answered!</p>
          <Button secondary as={Link} to="/">Back</Button> 
        </div>
      );
    }else{
        return(
          <div>
            <Form.Group inline>
              <Form.Field label="Polling Answers:"/>
              {this.renderPollingDefinedAnswers()}
            </Form.Group>
            <Form.Group inline>
              <Button secondary as={Link} to="/" floated="left">Back</Button> 
              <Form.Button primary onClick={this.handleClick} floated="left">Submit</Form.Button> 
            </Form.Group>           
          </div>
        )
      
    }
  }

  render() {
    if(!this.state.isLoaded){
      return(
        <Container text textAlign="center">
          Loading...
        </Container>
      )
    }

    return (
      <Container text textAlign="center">
        <Header>
          {this.state.polling.question}
        </Header>
        <Divider/>
        <Form>
          {this.renderPollingState()}
        </Form>
      </Container>
    );
  }
}

export default PollingAnswer;