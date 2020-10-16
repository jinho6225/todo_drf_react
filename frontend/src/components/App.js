import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInputField } from '../store'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        completed: false
      },
      editing: false
    }
    this.fetchTasks = this.fetchTasks.bind(this)
    this.getCookie = this.getCookie.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.taskUpdate = this.taskUpdate.bind(this)
    this.taskDelete = this.taskDelete.bind(this)
    this.lineThrough = this.lineThrough.bind(this)
  }

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  componentDidMount() {
    this.fetchTasks()
  }

  fetchTasks() {
    fetch('http://127.0.0.1:8000/api/task-list/')
    // fetch('https://jhmyung.pythonanywhere.com/api/task-list/')
    .then(res => res.json())
    .then(data => {
      this.setState({
        todoList:data
      })
    })
  }

  handleSubmit(e) {
    const { activeItem:{ title, id }, editing } = this.state
    e.preventDefault()
    const csrftoken = this.getCookie('csrftoken');
    let URL = 'http://127.0.0.1:8000/api/task-create/'
    // let URL = 'https://jhmyung.pythonanywhere.com/api/task-create/'

    if (editing) {
      URL = `http://127.0.0.1:8000/api/task-update/${id}/`
      // URL = `https://jhmyung.pythonanywhere.com/api/task-update/${id}/`
      this.setState({
        editing:false
      })
    }

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({ title }),
    })
    .then(res => {
      this.fetchTasks()
      this.setState({
        activeItem: {
          id: null,
          title: '',
          completed: false
        }
      })
    })
  }

  taskUpdate(taskObj) {
    this.setState({
      activeItem: taskObj,
      editing: true
    })
  }

  taskDelete(taskObj) {
    const csrftoken = this.getCookie('csrftoken');    
    let URL = `http://127.0.0.1:8000/api/task-delete/${taskObj.id}/`
    // let URL = `https://jhmyung.pythonanywhere.com/api/task-delete/${taskObj.id}/`

    fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
    })
    .then(res => {
      this.fetchTasks()
    })
  }

  lineThrough(taskObj) {
    taskObj.completed = !taskObj.completed

    const csrftoken = this.getCookie('csrftoken');
    let URL = `http://127.0.0.1:8000/api/task-update/${taskObj.id}/`
    // let URL = `https://jhmyung.pythonanywhere.com/api/task-update/${taskObj.id}/`
  
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify({ 
          title: taskObj.title, 
          completed: taskObj.completed 
        }),
    })
    .then(res => {
      this.fetchTasks()
    })
  }
  
  render() {
    const { todoList } = this.state
    return(
      <div className="container">
        <header className="header">
          <h2>Todo List</h2>
          <h4>(Django-RESTful-API + React.js)</h4>
        </header>

        <div className="inputBox">
            <form onSubmit={this.handleSubmit} method="POST" className="inputForm">
                <input
                onChange={this.props.handleChange}
                type="text" 
                placeholder="Add task" 
                className="inputField" 
                name="title" 
                value={this.props.inputField}
                />
                <button type="submit" className="submitBtn">Submit</button>
            </form>
        </div>

        <div className="list-container">
            <ul className="unorder-list">              
              {todoList.map(task => {
                return (
                  <li className="task-list" key={task.id}>
                    <span 
                    className={`content ${task.completed ? "active" : ""}`}
                    onClick={() => {
                      this.lineThrough(task)
                    }}
                    >{task.title}</span>
                    <span className="icon">
                      <i 
                      className="far fa-edit" 
                      aria-hidden="true"
                      onClick={() => {
                        this.taskUpdate(task)
                      }}
                      ></i>
                      <i 
                      className="far fa-trash-alt" 
                      aria-hidden="true"
                      onClick={() => {
                        this.taskDelete(task)
                      }}
                      ></i>
                    </span>
                </li>
                )
              })}
            </ul>
        </div>

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    inputField: state.inputField,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChange: (event) => dispatch(setInputField(event.target.value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);