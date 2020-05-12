import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './components/Clock';
import TaskList from './components/TaskList';
import Task from './components/Task';

import tasks from './mocks/list';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showClock: true,
      taskList: [],
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleButtonClick() {
    this.setState((state) => ({
      showClock: !state.showClock,
    }));
  }

  handleCheck(id) {
    this.setState({
      taskList: this.state.taskList.map((el) =>
        el.id === id
          ? {
              ...el,
              checked: !el.checked,
            }
          : el
      ),
    });
  }

  handleDelete(id) {
    const taskList = [...this.state.taskList];
    const elementIndex = taskList.findIndex((el) => el.id === id);
    taskList.splice(elementIndex, 1);
    this.setState({
      taskList,
    });
  }

  renderTaskList() {
    const { taskList } = this.state;
    return taskList.map((task, index) => (
      <Task
        key={task.id}
        id={task.id}
        checked={task.checked}
        onDelete={this.handleDelete}
        onCheck={this.handleCheck}
      >
        {index + 1} - {task.content}
      </Task>
    ));
  }

  renderStatistics() {
    const { taskList } = this.state;
    return (
      <div>
        <div>Items: {taskList.length}</div>
        <div>Checked items: {taskList.filter((el) => el.checked).length}</div>
      </div>
    );
  }

  componentDidMount() {
    Promise.resolve(tasks).then((tasks) => {
      this.setState({
        taskList: [...tasks],
      });
    });
  }

  render() {
    const { version } = this.props;
    const { showClock } = this.state;

    return (
      <div>
        <h3>App version: {version}</h3>
        {showClock && <Clock />}
        <button onClick={this.handleButtonClick}>Toggle clock</button>
        <TaskList>{this.renderTaskList()}</TaskList>
        {this.renderStatistics()}
      </div>
    );
  }
}

ReactDOM.render(<App version={1} />, document.getElementById('app'));

// React.createElement = { type: 'div', props: { children: 'Please, login!' }}
// React.createElement('div', {}, React.createElement('div', { user: user }, 'Please, login!'))
