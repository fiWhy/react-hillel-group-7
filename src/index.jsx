import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './components/Clock';

const TaskListElement = ({ number }) => {
  return <div>Task element - {number}</div>;
};

const TaskList = ({ children }) => {
  return <div>{children}</div>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showClock: true,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.setState((state) => ({
      showClock: !state.showClock,
    }));
  }

  render() {
    const { version } = this.props;
    const { showClock } = this.state;

    return (
      <div>
        <h3>App version: {version}</h3>
        {showClock && <Clock />}
        <button onClick={this.handleButtonClick}>Toggle clock</button>
        <TaskList>
          <TaskListElement number={1} />
          <TaskListElement number={2} />
          <TaskListElement number={3} />
          <TaskListElement number={4} />
        </TaskList>
      </div>
    );
  }
}

ReactDOM.render(<App version={1} />, document.getElementById('app'));

// React.createElement = { type: 'div', props: { children: 'Please, login!' }}
// React.createElement('div', {}, React.createElement('div', { user: user }, 'Please, login!'))
