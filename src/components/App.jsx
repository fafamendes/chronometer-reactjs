import React, { Component } from 'react';
import { connect } from 'react-redux';

import { add_100ms, clear } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.addLap = this.addLap.bind(this);
    this.clearLaps = this.clearLaps.bind(this);

    this.state = {
      started: false,
      intervalID: 0,
      laps: []
    }

  }
  handleStart() {
    if (this.state.started) return;
    const add_100ms = this.props.add_100ms;
    let intervalID = setInterval(function () {
      add_100ms();
    }, 10);
    this.setState({
      intervalID,
    });
    this.setState({ started: true })
  }

  handlePause() {
    if (this.state.started) {
      this.setState({ started: false });
      clearInterval(this.state.intervalID);
    }
  }

  handleStop() {
    this.props.clear();
    if (this.state.started) {
      this.setState({ started: false });
      clearInterval(this.state.intervalID);
    }
  }

  handleClear() {
    this.props.clear();
  }

  addLap() {
    let atualMilliseconds = this.props.chronometer.milliseconds;
    let { hours, minutes, seconds, milliseconds } = formatTime(atualMilliseconds);
    let laps = this.state.laps;
    laps.push(<h2>{formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}:{formatNumber(milliseconds)}</h2>);
    this.setState({laps,});
  }

  clearLaps(){
    let laps = []
    this.setState({laps,});
  }

  renderLaps(){
    let laps = [];
    this.state.laps.map((value, key)=>{
      return (
        laps.push(<div key={key}>{value}</div>)
      )
    });
    return laps;
    }

  render() {
    let ms = this.props.chronometer.milliseconds,
      { hours, minutes, seconds, milliseconds } = formatTime(ms);

    return (
      <div>
        <h1>{formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}:{formatNumber(milliseconds)}</h1>
        <div>
          <button onClick={this.handleStart}>Start</button>
          <button onClick={this.handlePause}>Pause</button>
          <button onClick={this.handleStop}>Stop</button>
          <button onClick={this.handleClear}>Clear</button>
        </div>
        <div>
          <button onClick={this.addLap}>Lap</button>
          <button onClick={this.clearLaps}>Clear Laps</button>
          <div>
            {this.renderLaps()}
          </div>
        </div>
      </div>
    );

  }
}

const formatTime = ms => {

  let milliseconds = ms % 1000 / 10;
  let seconds = ((ms / 1000) % 60).toFixed();
  let minutes = ((ms / 1000 / 60) % 60).toFixed();
  let hours = (ms / 1000 / 60 / 60).toString()[0];

  return {
    milliseconds,
    seconds,
    minutes,
    hours,
  }
}
const formatNumber = number => number < 10 ? `0${number}` : number;

const mapStateToProps = (chronometer) => ({ chronometer });
const mapDispatchToProps = { add_100ms, clear };

export default connect(mapStateToProps, mapDispatchToProps)(App);
