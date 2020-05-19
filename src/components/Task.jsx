import React from 'react';
import classes from 'classnames';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
    };
    this.handleToggleCheck = this.handleToggleCheck.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleToggleCheck() {
    const { onCheck, id } = this.props;
    onCheck(id);
  }

  handleDelete() {
    const { onDelete, id } = this.props;
    onDelete(id);
  }

  handleDragStart() {
    this.setState({
      dragging: true,
    });
  }

  handleDragEnd() {
    this.setState({
      dragging: false,
    });
  }

  render() {
    const { children, checked } = this.props;
    const { dragging } = this.state;
    return (
      <li
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        className={classes([
          'to-do-list-task',
          {
            dragging,
          },
        ])}
        draggable={true}
      >
        <div>
          <span>
            <button
              style={{
                cursor: 'pointer',
              }}
              onClick={this.handleToggleCheck}
            >
              V
            </button>
          </span>
          <span
            style={{
              textDecoration: checked ? 'line-through' : 'inherit',
            }}
          >
            {children}
          </span>
          <span>
            <button onClick={this.handleDelete}>X</button>
          </span>
        </div>
      </li>
    );
  }
}

export default Task;
