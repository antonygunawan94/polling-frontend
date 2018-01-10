import React, { Component } from 'react';
import { Button, List, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from 'moment';

class PollingListItem extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      startTimer: '',
      endTimer: '',
    }
    this.handleAnswerClick = this.handleAnswerClick.bind(this)
  }

  componentWillMount(){
    this.resetTimer()
  }

  beginStartTimer(duration){
    setInterval(() => {
      if(duration <= 0)
        this.resetTimer()
      duration -= 1000
      let currTimer = moment.duration(duration).humanize(true)
      this.setState({startTimer: currTimer})
    },1000)
  }
  
  beginEndTimer(duration){
    setInterval(() => {
      if(duration <= 0)
        this.resetTimer()
      duration -= 1000
      let currTimer = moment.duration(duration).humanize(true)
      this.setState({ endTimer: currTimer })
    }, 1000)
  }

  resetTimer(){
    const polling = this.props.polling;

    const momentStartDate = moment(polling.start_date);
    const momentEndDate = moment(polling.expired_date);
    const momentNow = moment();

    if (momentNow.isBefore(momentStartDate)) {
      this.beginStartTimer(momentStartDate.diff(momentNow))
    } else if (momentNow.isBetween(momentStartDate, momentEndDate)) {
      this.beginEndTimer(momentEndDate.diff(momentNow))
    }
    this.renderTimeStatus()
  }

  handleAnswerClick(){
    this.props.onPollingItemClicked(this.props.polling)
  }

  renderTimeStatus(){
    const polling = this.props.polling;
    
    const momentStartDate = moment(polling.start_date);
    const momentEndDate = moment(polling.expired_date);
    const momentNow = moment();

    if (momentNow.isBefore(momentStartDate)) {
      return (
        <div>
          Starting { this.state.startTimer }
        </div>
      )
    } else if (momentNow.isBetween(momentStartDate, momentEndDate)) {
      return(
        <div>
          Ending { this.state.endTimer }
        </div>
      )
    } else if (momentNow.isAfter(momentEndDate)) {
      return (
        <div>
          Ended
        </div>
      )
    }
  }

  render() {
    const polling = this.props.polling;

    return (
      <List.Item>
        <List.Content floated="right">
          <Button secondary onClick={this.handleAnswerClick}>Answer</Button>
        </List.Content>
        <List.Content floated="right">
          <Button color="grey" as={Link} to={"/polling/" + polling.id}>Detail</Button>
        </List.Content>
        <List.Content floated="right">
          { this.renderTimeStatus() }
        </List.Content>
        <Icon name="announcement" />
        <List.Content verticalAlign='middle'>
          { polling.question }
        </List.Content>
      </List.Item>
    );
  }
}

export default PollingListItem;