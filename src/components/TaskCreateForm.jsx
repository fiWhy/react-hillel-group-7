import React from 'react';

export default class TaskCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate() {
    const { onCreate } = this.props;
    onCreate(this.inputRef.current.value);
    this.inputRef.current.value = '';
  }

  render() {
    return (
      <div>
        <input
          ref={this.inputRef}
          type="text"
          placeholder="Type task here..."
        />
        <button onClick={this.handleCreate}>Create</button>
      </div>
    );
  }
}
