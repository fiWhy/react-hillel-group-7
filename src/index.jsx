import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import classes from 'classnames';
import Clock from './components/Clock';
import TaskList from './components/TaskList';
import Task from './components/Task';

import tasks from './mocks/list';
import TaskCreateForm from './components/TaskCreateForm';
import DropZone from './components/DropZone';
import move from './utils/move';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showClock: true,
      draggingElement: null,
      draggingElementIndex: null,
      taskList: [],
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  moveDraggingElementToPosition(to) {
    const { draggingElement, taskList } = this.state;
    const itemIndex = taskList.findIndex(
      (listItem) => listItem.id === draggingElement.id
    );
    let newList;
    if (itemIndex > to) {
      newList = move(taskList, itemIndex, to);
    } else if (itemIndex < to && to - itemIndex > 1) {
      newList = move(taskList, itemIndex, Math.max(to - 1, 0));
    } else {
      newList = [...taskList];
    }
    return newList;
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

  handleDragStart(id) {
    const draggingElementIndex = this.state.taskList.findIndex(
      (el) => el.id === id
    );
    this.setState({
      draggingElement: this.state.taskList[draggingElementIndex],
      draggingElementIndex,
    });
  }

  handleDragEnd() {
    this.setState({
      draggingElement: null,
      draggingElementIndex: null,
    });
  }

  handleDrop(position) {
    const taskList = this.moveDraggingElementToPosition(position);
    this.handleDragEnd();
    this.setState({
      taskList,
    });
  }

  handleCreate(content) {
    this.setState({
      taskList: [
        ...this.state.taskList,
        {
          id: uuidv4(),
          content,
          checked: false,
        },
      ],
    });
  }

  renderTaskList() {
    const { taskList, draggingElementIndex } = this.state;
    return taskList.map((task, index) => (
      <React.Fragment key={task.id}>
        <Task
          id={task.id}
          checked={task.checked}
          onDragStart={this.handleDragStart}
          onDelete={this.handleDelete}
          onCheck={this.handleCheck}
          onDragEnd={this.handleDragEnd}
        >
          {index + 1} - {task.content}
        </Task>

        <DropZone
          className={classes({
            'non-drop':
              draggingElementIndex === index ||
              draggingElementIndex === index + 1,
          })}
          position={index + 1}
          onDrop={this.handleDrop}
        />
      </React.Fragment>
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
    const { showClock, draggingElementIndex } = this.state;

    return (
      <div>
        <h3>App version: {version}</h3>
        {/* {showClock && <Clock />}
        <button onClick={this.handleButtonClick}>Toggle clock</button> */}
        <TaskCreateForm onCreate={this.handleCreate} />
        <TaskList>
          <DropZone
            position={0}
            className={classes({
              'non-drop': draggingElementIndex === 0,
            })}
            onDrop={this.handleDrop}
          />
          {this.renderTaskList()}
        </TaskList>
        {this.renderStatistics()}
      </div>
    );
  }
}

ReactDOM.render(<App version={1} />, document.getElementById('app'));

// React.createElement = { type: 'div', props: { children: 'Please, login!' }}
// React.createElement('div', {}, React.createElement('div', { user: user }, 'Please, login!'))
