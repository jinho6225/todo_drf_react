import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        title: '',
        completed: false
      },
      editing: false
    }
    this.fetchTasks = this.fetchTasks.bind(this)
  }

  componentDidMount() {
    this.fetchTasks()
  }

  fetchTasks() {
    fetch('http://127.0.0.1:8000/api/task-list/')
    .then(res => res.json())
    .then(data => console.log(data))
  }
  
  render() {
    return(
      <div className="container">
        <div>

          <div>
            <form action="">
              <div>
                <div>
                  <input type="text"/>
                </div>
                <div>
                  <input type="submit"/>
                </div>
              </div>
            </form>
          </div>

          <div>
            
          </div>

        </div>
      </div>
    )
  }
}

export default App;
