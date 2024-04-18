import React from "react";
import "./notfound.css";
function NotFound() {
  return (
    <div className="notfound">
      <h1>404 Page NotFound</h1>
      <p>The path you are in this is not found on our website </p>
      <button>
        <a href="/">Go Back Home</a>
      </button>
    </div>
  );
}

export default NotFound;
