import React, { Component } from 'react';
import Item from './Item';
import './App.css';
import fire from './fire';

class App extends Component {
  constructor(props) {
    super(props)
    this.addItemToList = this.addItemToList.bind(this)
    this.clearList = this.clearList.bind(this)
    this.inputField  = React.createRef();
    this.state = { messages: [] }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('parent: getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    // console.log('parent: componentDidMount');
    // API calls
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
    // console.log('parent:' + messagesRef);

    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
    // console.log('parent: componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('parent: shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // console.log('parent: getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('parent: componentDidUpdate');
  }

  componentWillUnmount() {
    // console.log('parent: componentWillUnmount');
  }

  // componentDidCatch(error, info) {}

  addItemToList(e) {
    e.preventDefault();
    // let list = [...this.state.messages]
    if(this.inputField.current.value !== '') {
      // list.push(this.inputField.current.value);
      // list.sort();
      // this.setState({
      //   messages: list
      // });
      fire.database().ref('messages').push(this.inputField.current.value);
      this.inputField.current.value = ''
    }
  }

  clearList() {
    fire.database().ref('messages').remove();
    this.setState({ messages: [ ] });
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
        <button onClick={ this.clearList }>Clear All</button>
        <ol className="Todo">
          {
            this.state.messages.map((item) =>
              <Item key={ item.id } description= { item.text } />
            )
          }
        </ol>
      </div>
    );
  }
}

export default App;
