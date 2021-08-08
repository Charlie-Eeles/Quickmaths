import './App.css';
import React, { Component } from "react";

class App extends Component{

  state = {
    test: 0
  }

  render(){

    const mathFunction = (x, clear) =>{
      const chosenTable = x || 16;
      let secondCounter = 0;
      let scoreCounter = 0;
    }

    return (
      
      <div>
        <button onClick={()=>{mathFunction()}}>Click here to start timer</button>
        {this.state.test}
      </div>
    );
  }
}

export default App;
