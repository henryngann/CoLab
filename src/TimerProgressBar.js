import React from "react";

const TimerProgressBar = (props) => {
  const { completed, timer } = props;

  const containerStyles = {
    height: 15,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 5
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: '#48A0F1',
    borderRadius: 'inherit',
    textAlign: 'right'
  }

//   const labelStyles = {
//     padding: 5,
//     color: 'white',
//     fontWeight: 'bold'
//   }

  return (
    <div>
        <div style={containerStyles}>
        <div style={fillerStyles} />
        </div>
    </div>
  );
};

export default TimerProgressBar;

