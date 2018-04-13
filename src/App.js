import React, { Component } from 'react';
import Item from './Item';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.addItemToList = this.addItemToList.bind(this)
    this.inputField  = React.createRef();
    this.state = { todo_list: [] }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('parent: getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('parent: componentDidMount');
    // API calls
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('parent: shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('parent: getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('parent: componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('parent: componentWillUnmount');
  }

  // componentDidCatch(error, info) {}

  addItemToList(e) {
    e.preventDefault();
    let list = [...this.state.todo_list]
    if(this.inputField.current.value !== '') {
      list.push(this.inputField.current.value);
      list.sort();
      this.setState({
        todo_list: list
      });
      this.inputField.current.value = ''
    }
  }

  render() {
    return (
      <div className="App">
        <h1>To Do List</h1>
        <p>(Add new ToDo items to the list using the input box)</p>
        <form onSubmit={ this.addItemToList } >
          <input type="text" ref={ this.inputField }/>
          <button type="submit">Add</button>
        </form>
        <ol className="Todo">
          {
            this.state.todo_list.map((item, index) =>
              <Item key={ index } description= { item } />
            )
          }
        </ol>
      </div>
    );
  }
}

export default App;
