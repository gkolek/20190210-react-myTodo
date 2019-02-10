import React from 'react';

class FilterContainer extends React.Component {

  state = {
    searchText: '',
    searchType: 'all'
  }

  changeHandler = (event) => {
    this.setState({ searchText: event.target.value });
  }

  changeTypeHandler = (event) => {
    this.setState({ searchType: event.target.value }, () => {
      this.props.search(this.state);
    });
  }

  keyDownHandler = (event) => {
    if (event.keyCode === 13) {
      if (!this.state.searchText) {
        this.props.resetFilters();
        return;
      }
      this.props.search(this.state);
    }
  }

  renderClearFiltersButton() {
    if (this.props.filterActive) {
      return (
        <button onClick={this.props.resetFilters}>Clear filters</button>
      );
    }
    return null;
  }

  render() {
    return(
      <div>
        <input
          onKeyDown={this.keyDownHandler}
          onChange={this.changeHandler} />
        <select onChange={this.changeTypeHandler}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        {this.renderClearFiltersButton()}
      </div>
    );
  }
}

export default FilterContainer;
