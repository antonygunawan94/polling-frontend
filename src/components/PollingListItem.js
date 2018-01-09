import React, { Component } from 'react';
import { Button, List, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from 'moment';

class PollingListItem extends Component {
  state = { 
    startTimer: '',
    endTimer: '',
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

  renderTimeStatus(){
    const polling = this.props.polling;

    
    const momentStartDate = moment(polling.start_date);
    const momentEndDate = moment(polling.expired_date);
    const momentNow = moment();

    console.log(polling.question + ' ' +  momentNow + ' ' + momentStartDate + ' ' + momentEndDate)

    if (momentNow.isBefore(momentStartDate)) {
      console.log(polling.question + ' is before')      
      return (
        <div>
          Starting { this.state.startTimer }
        </div>
      )
    } else if (momentNow.isBetween(momentStartDate, momentEndDate)) {
      console.log(polling.question + ' is between')
      return(
        <div>
          Ending { this.state.endTimer }
        </div>
      )
    } else if (momentNow.isAfter(momentEndDate)) {
      console.log(polling.question + ' ended')
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
      <List.Item as={Link} to={"/polling/"+polling.id}>
        <List.Content floated="right">
          <Button as={Link} to={"/polling/answer"} secondary>Answer</Button>
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