import './App.css';
import React, { Component } from "react";

class App extends Component{

  state = {
    interval: 1,
    secondCount: 0,
    correctAnswer: false,
    specificTable: false,
    table: 12,
    multiplication: 0,
    gameOn:false,
    potentialAnswer: 0,
    scoreCounter: 0,
    includeDivision: false,
    randomSymbol: 0,
    createHighScore: false
  }

  render(){

    const setTable = (e) => {
      const valFloat = parseFloat(e.target.value);
      const maxFloat = parseFloat(e.target.max);
      const minFloat = parseFloat(e.target.min);

      if(valFloat === NaN){e.target.value = minFloat || 0}
      if(valFloat > maxFloat){
          const stateFloat = parseFloat(this.state.table);
          if(stateFloat && stateFloat < maxFloat){
          e.target.value = stateFloat + 1;
          }
          else{
          e.target.value = maxFloat;  
          }
      }
      if(valFloat < minFloat){
          e.target.value = minFloat;
      }

      if(valFloat>1 && valFloat<=20){
        this.setState({table: valFloat, specificTable:true})
      }
      else{
        this.setState({specificTable:false})
      }
    }

    const handleAnswer = (e) => {
      const valFloat = parseFloat(e.target.value);
      this.setState({potentialAnswer: valFloat})
      if(this.state.correctAnswer === valFloat && this.state.correctAnswer !== false){
        gameFunc(true);
        e.target.value=""
      }
    }

    const timerFunc = () =>{
      if( this.state.secondCount <=0){
        if(!this.state.specificTable && this.state.includeDivision){this.setState({createHighScore: true})}
        this.setState({secondCount: 5, gameOn: true})
        this.setState({interval : setInterval(()=> {this.setState({secondCount: this.state.secondCount-1})}, 1000)})
        gameFunc()
      }
    }

    const clearIntervalFunc = () =>{
      if(this.state.secondCount<=0){
        clearInterval(this.state.interval)
      }
    }

    const gameFunc = (x) =>{
      let randomSymbol;
      if(this.state.includeDivision){ randomSymbol = Math.floor(Math.random() * 2)}
      else{randomSymbol = 0}
      if(randomSymbol === 0){
        this.setState({randomSymbol: "*"})
      }
      else{
        this.setState({randomSymbol: "/"})
      }
      let tableVariable;
      if(this.state.specificTable){
        tableVariable = this.state.table;
      }
      else{
        tableVariable = Math.floor(Math.random() * 12);
        tableVariable++;
        this.setState({table: tableVariable})
      }

      if(!this.state.correctAnswer){
        let multiplicationVariable = Math.floor(Math.random() * 12);
        multiplicationVariable++;
        let correctAnswerVariable;
        if(randomSymbol === 0){
          correctAnswerVariable = multiplicationVariable * tableVariable;
        }
        else{
          let biggerNumber = Math.max(multiplicationVariable, tableVariable);
          let smallerNumber = Math.min(multiplicationVariable, tableVariable);
          while(biggerNumber % smallerNumber !== 0){
            multiplicationVariable = Math.floor(Math.random() * 12);
            multiplicationVariable++;
            smallerNumber = Math.min(multiplicationVariable, tableVariable);
            biggerNumber = Math.max(multiplicationVariable, tableVariable);
          }
          correctAnswerVariable = biggerNumber / smallerNumber
        }
        
        this.setState({correctAnswer: correctAnswerVariable, multiplication: multiplicationVariable})
      }
      if(x === true && this.state.secondCount >0){
        let multiplicationVariable = Math.floor(Math.random() * 12);
        multiplicationVariable++;
        let correctAnswerVariable;
        if(randomSymbol === 0){
          correctAnswerVariable = multiplicationVariable * tableVariable;
        }
        else{
          let biggerNumber = Math.max(multiplicationVariable, tableVariable);
          let smallerNumber = Math.min(multiplicationVariable, tableVariable)
          while(biggerNumber % smallerNumber !== 0){
            multiplicationVariable = Math.floor(Math.random() * 12);
            multiplicationVariable++;
            smallerNumber = Math.min(multiplicationVariable, tableVariable);
            biggerNumber = Math.max(multiplicationVariable, tableVariable);
          }
          correctAnswerVariable = biggerNumber / smallerNumber
        }
        this.setState({correctAnswer: correctAnswerVariable, secondCount: this.state.secondCount+2, multiplication: multiplicationVariable, scoreCounter: this.state.scoreCounter+1})
      }
    }

    const leftNumber = () =>{
      if(this.state.randomSymbol === "/"){
        return Math.max(this.state.table, this.state.multiplication)
      }
      else{
        return this.state.table
      }
    }
    const rightNumber = () =>{
      if(this.state.randomSymbol === "/"){
        return Math.min(this.state.table, this.state.multiplication)
      }
      else{
        return this.state.multiplication
      }
    }

    const setHighscore = () =>{
      let highscore = parseInt(localStorage.getItem("highscore"));
      if(!highscore){localStorage.setItem("highscore", this.state.scoreCounter); return this.state.scoreCounter}
      else if(this.state.scoreCounter > highscore){localStorage.setItem("highscore", this.state.scoreCounter); return this.state.scoreCounter}
      return highscore;
    }

    return (
      
      <div id="flex-container">
        {!this.state.gameOn ?
          (<div class="game-div">
            Table: <input type="number" min="1" max="20" onChange={setTable}></input><br/><br/>
            <button onClick={()=>{timerFunc()}}>Click here to start</button>
            <input type="checkbox" id="division" name="include-division" value="include-division" onClick={()=>{this.setState({includeDivision: !this.state.includeDivision})} }></input>
            <label for="include-division">Include division</label><br/><br/>
            High score: {parseInt(localStorage.getItem("highscore")) || 0}<br/><br/>
            To set a high score, you must leave<br/> the table blank and include division!
            {clearIntervalFunc()}
          </div>):
          (this.state.secondCount > 0 ?
          (<div class="game-div">
            Time:{this.state.secondCount} Score: {this.state.scoreCounter}<br/>
            {leftNumber()} {this.state.randomSymbol} {rightNumber()} = 
            {clearIntervalFunc()}
            <input type="number"onChange={handleAnswer}></input>
          </div>):
          (<div class="game-div">
            {}
            Score: {this.state.scoreCounter}<br/>
            {this.state.createHighScore ? <p>High score: {setHighscore()}</p>: <p></p>}
            <button onClick={()=>{window.location.reload()}}>Restart</button>
          </div>)
          )
          
        }
      </div>
    );
  }
}

export default App;
