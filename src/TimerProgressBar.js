import React from "react";

const TimerProgressBar = (props) => {
  const { completed, timer } = props;

  const containerStyles = {
    height: 18,
    width: '70%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: '#6a1b9a',
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div>
        <div style={containerStyles}>
        <div style={fillerStyles} />
        </div>
    </div>
  );
};

export default TimerProgressBar;

