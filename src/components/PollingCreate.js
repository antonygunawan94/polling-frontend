import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Header } from "semantic-ui-react";
import { DateRangePicker } from "react-dates";
import TimePicker from 'material-ui/TimePicker'
import moment from "moment";
import http from "axios";
import { toast } from 'react-toastify';

class PollingCreate extends Component {

  constructor(props){
    super(props);
    this.state = {
      question: '',
      room_id: '',
      startDate: null,
      endDate: null,
      pdas: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputAnswerChanged = this.handleInputAnswerChanged.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }
  
  handleFormSubmit(e){
    let question, room_id, startDate, endDate
    ({question, room_id, startDate, endDate } = this.state)
    console.log(room_id)
    console.log(this.state)
    if(!question){
      toast.error(`Polling question can't be empty`, {
        position: toast.POSITION.TOP_CENTER
      })
      return;
    }else if(!room_id){
      toast.error(`Room ID can't be empty`, {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }else if(isNaN(room_id)){
      toast.error(`Room ID must be a number`, {
        position: toast.POSITION.TOP_CENTER
      })
      return
    }else if(!startDate){
      toast.error(`Start date can't be empty`, {
        position: toast.POSITION.TOP_CENTER
      })
      return
    }else if(!endDate){
      toast.error(`End date can't be empty`, {
        position: toast.POSITION.TOP_CENTER
      })
      return
    }

    let pdas = this.state.pdas.map((pda) => {
      return {
        'answer': pda.answer
      }
    });

    let polling = {
      'room_id': this.state.room_id,
      'question': this.state.question,
      'polling_defined_answers': pdas,
      'start_date': this.state.startDate.toISOString(),
      'expired_date': this.state.endDate.toISOString()
    }

    console.log(JSON.stringify(polling))

    http.post("http://localhost:9000/polling", JSON.stringify(polling))
        .then((res) => { 
          console.log(res)
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER
          })
        }).catch((err) => {
          console.log(err)
          toast.error("Failed to create new polling", {
            position: toast.POSITION.TOP_CENTER
          })
        })  
  }

  handleInputChange(e){
    let key = e.target.getAttribute('name');
    let value = e.target.value;
    this.setState({ [key]: value })
  }

  handleInputAnswerChanged(e){
    let pdas = this.state.pdas;
    let id = parseInt(e.target.getAttribute('name'));
    pdas[id].answer = e.target.value;
    this.setState({pdas: pdas});
  }

  handleAddClick(){
    this.setState({
      pdas: [...this.state.pdas, { id: this.state.pdas.length, answer: '' }]
    });
  }

  renderPollingDefinedAnswers(){
    const listPda = this.state.pdas.map((pda) => {
      return (
        <Form.Input
          key={pda.id}
          label="Custom Answer"
          placeholder="Defined polling answer"
          name={pda.id}
          value={pda.answer}
          onChange={this.handleInputAnswerChanged} />
      )
    });
    if(listPda.length > 0){
      return (
        <div>
          {listPda}
          <Divider />
        </div>
      );
    }
  }

  render() {
    return (
      <Container>
        <Header as="h2">
          Create New Polling
          <Button as={Link} to="/" color="red" floated="right">Back</Button>
        </Header>
        <Divider/>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Input label="Question" placeholder="Insert polling question" name="question" value={this.state.question} onChange={this.handleInputChange}/>
          <Form.Input label="Room ID" placeholder="Insert polling room id" name="room_id" value={this.state.room_id} onChange={this.handleInputChange} />
          <Form.Field width="16">
            <label>Polling Date</label>
            <DateRangePicker
              startDate={this.state.startDate} // momentPropTypes.momentObj or null,
              endDate={this.state.endDate} // momentPropTypes.momentObj or null,
              onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Start Time</label>
            </Form.Field>
            <Form.Field>
              <label>End Time</label>
            </Form.Field>
          </Form.Group>
          <Header as="h3">
            Add Polling Defined Answer
            <Button primary type="button" floated="right" onClick={ this.handleAddClick }>Add</Button> 
          </Header>
          <Divider/>
          { this.renderPollingDefinedAnswers() }
          <Form.Button color="green">Submit</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default PollingCreate;