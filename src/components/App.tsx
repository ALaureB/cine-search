import * as React from "react";
// @ts-ignore
import * as img from "../assets/movie_night.jpg";
import "../styles/App.scss";
import Search from "./Search";

class App extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <img src={img} alt="Start coding !" id="img" />
        <Search />
      </div>
    );
  }
}

export default App;
