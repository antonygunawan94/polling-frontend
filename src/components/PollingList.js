import React from 'react';
import { List } from "semantic-ui-react";
import PollingListItem from "./PollingListItem";

const PollingList = (props) => {
  const pollings = props.pollings;

  if(!pollings){
    return (
      <div>Loading...</div>
    )
  }

  return (
    <List selection divided verticalAlign="middle">
      { renderPollingListItem(pollings) }
    </List>
  );
}

function renderPollingListItem(pollings) {
  return (
    pollings.map(polling => {
      console.log(polling.question)
      return <PollingListItem key={polling.id} polling={polling}/>
    })
  ); 
}

export default PollingList;