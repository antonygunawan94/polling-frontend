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
      { renderPollingListItem(props, pollings) }
    </List>
  );
}

function renderPollingListItem(props, pollings) {
  return (
    pollings.map(polling => {
      return <PollingListItem key={polling.id} polling={polling} onPollingItemClicked={props.onPollingItemClicked}/>
    })
  ); 
}

export default PollingList;