import React from "react";

const TimerProgressBar = (props) => {
  const { completed } = props;

  const containerStyles = {
    height: 15,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 5,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "#48A0F1",
    borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <div>
      <div style={containerStyles}>
        <div style={fillerStyles} />
      </div>
    </div>
  );
};

export default TimerProgressBar;
