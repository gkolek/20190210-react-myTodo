import React, { Component } from 'react';

import FilterContainer from './FilterContainer';
import CreateTask from './CreateTask';
import TasksContainer from './TaskContainer';
class App extends Component {

  state = {
    tasks: [],
    filterActive: false,
    filteredTasks: [],
    isLoading: true,
  };

  componentWillMount() {
    setTimeout(() => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      this.setState({ tasks }, () => {
        this.setState({ isLoading: false });
      });
    }, 3000);
  }

  updateTask = (taskId, newValue, field) => {
    const taskIndex = this.state.tasks.findIndex(task => task.id === taskId);
    const task = { ...this.state.tasks[taskIndex] };

    task[field] = newValue;

    const tasks = [...this.state.tasks];
    tasks[taskIndex] = task;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.setState({ tasks: tasks });  // this.setState({ tasks });
  }

  handleChange = (event, taskId) => {
    this.updateTask(taskId, event.target.checked, 'completed');
  }

  updateHandler = (newName, taskId) => {
    this.updateTask(taskId, newName, 'name');
  }

  handleCreate = (name) => {
    const uuId = Math.floor(Math.random() * 10000);
    const tasks = [...this.state.tasks];
    const task = { id: uuId, name: name, completed: false };
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.setState({ tasks: tasks }); // this.setState({ tasks });
  }

  handleRemove = (taskId) => {
    const taskIndex = this.state.tasks.findIndex(task => task.id === taskId);
    const tasks = [...this.state.tasks];
    tasks.splice(taskIndex, 1);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.setState({ tasks });
  }

  search = ({ searchText, searchType }) => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter(task => {
      return task.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    });
    if (searchType !== 'all') {
      const completedFilter = searchType === 'completed';
      tasks = tasks.filter(task => {
        return task.completed === completedFilter;
      });
    }
    this.setState({ filteredTasks: tasks, filterActive: true });
  }

  resetFilters = () => {
    this.setState({ filteredTasks: [], filterActive: false });
  }

  render() {
    const {
      isLoading,
      filterActive,
      filteredTasks,
      tasks
    } = this.state;
    const showIndicator = isLoading ? 'block' : 'none';
    return (
      <div>
        <FilterContainer
          search={this.search}
          filterActive={filterActive}
          resetFilters={this.resetFilters} />
        <CreateTask createHandler={this.handleCreate} />
        <p style={{ display: showIndicator }}>Loading...</p>
        <TasksContainer
          todo={filterActive ? filteredTasks : tasks}
          handleChange={this.handleChange}
          handleRemove={this.handleRemove}
          updateHandler={this.updateHandler}
          />
      </div>
    );
  }
}

export default App;
