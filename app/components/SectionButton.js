import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default function SectionButton (props) {
  return (
  <RaisedButton
    {...props}
    buttonStyle={
      {
        backgroundColor: 'white',
      }
    }
    style={
      {
        margin: '1em'
      }
    }
    />
  )
}
