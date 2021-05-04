import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Serie from "./components/serie";

function App(props) {
  return <Serie URL={props.URL}/>;
}

export default App;
