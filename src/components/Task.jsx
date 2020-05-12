import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleCheck = this.handleToggleCheck.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleToggleCheck() {
    const { onCheck, id } = this.props;
    onCheck(id);
  }

  handleDelete() {
    const { onDelete, id } = this.props;
    onDelete(id);
  }

  render() {
    const { children, checked } = this.props;
    return (
      <li>
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
