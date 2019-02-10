import React, { Component } from 'react';

class Task extends Component {

  state = {
    editMode: false,
    name: ''
  }

  handleChange = (event) => {
    this.setState({ name:  event.target.value });
  }

  keyDown = (event) => {
    if (!this.state.name) {
      return;
    }
    if (event.keyCode === 13) {
      this.props.updateHandler(this.state.name);
      this.setState({ name: '', editMode: false });
    } else if (event.keyCode === 27) {
      this.setState({ editMode: false });
    }
  }

  handleClick = () => {
    this.setState({ editMode: true, name: this.props.task.name });
  }

  renderTask() {
    if (this.state.editMode) {
      return (
        <input type="text" defaultValue={this.props.task.name} onChange={this.handleChange} onKeyDown={this.keyDown}/>
      );
    }
    return <span onClick={this.handleClick}>{this.props.task.name}</span>;
  }

  render () {
    // this.props.task = { id: 1, name: 'Odkurzyc', completed: false }
    const styles = this.props.task.completed
    ? { textDecoration: 'line-through' }
    : {};
    return (
      <div style={styles}>
        <input
          type="checkbox"
          checked={this.props.task.completed}
          onChange={this.props.handleChange}
        />
        {this.renderTask()}
        <button onClick={this.props.handleRemove}>X</button>
      </div>
    );
  }
}

export default Task;
