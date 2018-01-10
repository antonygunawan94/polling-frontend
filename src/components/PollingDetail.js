import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, List, Table, Segment } from "semantic-ui-react";
import http from "axios";
import moment from "moment";
import { toast } from "react-toastify";

class PollingDetail extends Component {
  
  state = {
    polling: null,
    polling_user_answers: []
  }

  componentWillMount(){
    http.get("http://localhost:9000/polling/" + this.props.match.params.id)
        .then((res) => {
          const data = res.data.data
          this.setState({
            polling: data.polling,
            polling_user_answers: data.polling_user_answers
          })
        })
        .catch((error) => {
          toast.error(error)
        })
  }

  renderPollingUserAnswerList(){
    return this.state.polling_user_answers.map((pua) => {
      return (
        <Table.Row key={pua.id}>
          <Table.Cell> {pua.username} </Table.Cell>
          <Table.Cell> {pua.answer} </Table.Cell>
        </Table.Row>
      )
    })
  }

  renderPollingDefinedAnswerList(){
    return this.state.polling.polling_defined_answers.map((pda) => {
      return(
        <List.Item key={pda.id}>
          { pda.answer }
        </List.Item>
      )
    })
  }
  
  render() {
    if(!this.state.polling) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <Container text textAlign="center">
        <Header as="h2">
          Polling Detail
        </Header>
        <Divider/>
        <Container textAlign="left">
          <Header as="h3">
            Question:
            <Header.Subheader>
                {this.state.polling.question}
            </Header.Subheader>
          </Header>
          <Header as="h3">
            Room ID:
            <Header.Subheader>
                {this.state.polling.room_id}
            </Header.Subheader>
          </Header>
          <Header as="h3">
            Start Date:
            <Header.Subheader>
                {moment(this.state.polling.start_date).format("DD MMMM YYYY hh:mm:ss")}
            </Header.Subheader>
          </Header>
          <Header as="h3">
            Expired Date:
            <Header.Subheader>
                {moment(this.state.polling.expired_date).format("DD MMM YYYY hh:mm:ss")}
            </Header.Subheader>
          </Header>
          <Header as="h3">
            Polling Defined Answers:
            <Header.Subheader>
                <List horizontal bulleted size="large">
                  {this.renderPollingDefinedAnswerList()}
                </List>
            </Header.Subheader>
          </Header>
          <Header as="h3">
            Total User Answers:
            <Header.Subheader>
              { this.state.polling_user_answers.length }
            </Header.Subheader>
          </Header>
          <Header as="h3">
            Detail User Answers:
          </Header>
          <Table celled padded>

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Answer</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.renderPollingUserAnswerList()}
            </Table.Body>
          </Table> 
          <div>
            <Button as={Link} to="/" primary>Back</Button>
          </div>
        </Container>
      </Container>
    );
  }
}

export default PollingDetail;