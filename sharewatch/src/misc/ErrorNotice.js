import React from "react";

export default function ErrorNotice(props) {
  return (
    <div className="error-notice">
      <span>
        {props.message}
        <button onClick={props.clearError}>x</button>
      </span>
    </div>
  );
}
