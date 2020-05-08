import React from 'react';
import { formatTimer } from '../utils/test-functionts';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.timerID = null;
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { date } = this.state;
    return <div>{formatTimer(date)}</div>;
  }
}
