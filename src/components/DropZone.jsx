import React from 'react';
import classes from 'classnames';

export default class DropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
  }

  handleDrop(e) {
    console.log(e);
    this.setState({
      active: false,
    });
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDragEnter(e) {
    this.setState({
      active: true,
    });
  }

  handleDragLeave(e) {
    this.setState({
      active: false,
    });
  }

  render() {
    const { active } = this.state;
    return (
      <div
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        className={classes([
          'drop-zone',
          {
            active,
          },
        ])}
      ></div>
    );
  }
}
