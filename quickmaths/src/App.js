import './App.css';
import React, { Component } from "react";

class App extends Component{

  state = {
    interval: 1,
    secondCount: 1
  }
  async componentDidMount(){
  }

  render(){

    const mathFunction = (x, clear) =>{
      const chosenTable = x || 16;
      let scoreCounter = 0;
      this.setState({secondCount: 5})
      this.setState({interval : setInterval(()=> {this.setState({secondCount: this.state.secondCount-1})}, 1000)})
    }

    const clearIntervalFunc = () =>{
      if(this.state.secondCount<=0){
        clearInterval(this.state.interval)
      }
    }

    return (
      
      <div>
        <button onClick={()=>{mathFunction()}}>Click here to start timer</button>
        <button onClick={()=>{this.setState({secondCount: this.state.secondCount+1})}}>increase</button>
        {clearIntervalFunc()}
        {this.state.secondCount}
      </div>
    );
  }
}

export default App;
