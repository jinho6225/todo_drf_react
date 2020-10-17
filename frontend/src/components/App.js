import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  setInputField, 
  requestTodos, 
  requestAddTodo,
  requestRMVTodo
} from '../action'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: {
        id: null,
        completed: false
      },
      editing: false
    }
    this.getCookie = this.getCookie.bind(this)
    this.taskUpdate = this.taskUpdate.bind(this)
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
    const { onRequestTodos } = this.props
    onRequestTodos()
  }

  taskUpdate(taskObj) {
    const { activeItem:{ id }, editing } = this.state
    if (editing) {
      URL = `http://127.0.0.1:8000/api/task-update/${id}/`
      // URL = `https://jhmyung.pythonanywhere.com/api/task-update/${id}/`
      this.setState({
        editing:false
      })
    }
    this.setState({
      activeItem: taskObj,
      editing: true
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
    const { 
      title, 
      todos, 
      handleChange, 
      onRequestRMVTodo,
      onRequestAddTodo
    } = this.props
    const csrftoken = this.getCookie('csrftoken');
    return(
      <div className="container">
        <header className="header">
          <h2>Todo List</h2>
          <h4>(Django-RESTful-API + React.js)</h4>
        </header>

        <div className="inputBox">
            <form onSubmit={(e) => {
              e.preventDefault()
              onRequestAddTodo(title, csrftoken)
            }} method="POST" className="inputForm">
                <input
                onChange={handleChange}
                type="text" 
                placeholder="Add task" 
                className="title" 
                name="title" 
                value={title}
                />
                <button type="submit" className="submitBtn">Submit</button>
            </form>
        </div>

        <div className="list-container">
            <ul className="unorder-list">              
              {todos.map(todo => {
                return (
                  <li className="task-list" key={todo.id} id={todo.id}>
                    <span 
                    className={`content ${todo.completed ? "active" : ""}`}
                    onClick={() => {
                      this.lineThrough(todo)
                    }}
                    >{todo.title}</span>
                    <span className="icon">
                      <i 
                      className="far fa-edit" 
                      aria-hidden="true"
                      onClick={() => {
                        this.taskUpdate(todo)
                      }}
                      ></i>
                      <i 
                      className="far fa-trash-alt" 
                      aria-hidden="true"
                      onClick={() => {
                        onRequestRMVTodo(todo.id, csrftoken)
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


const mapStateToProps = (state, ownProps) => {
  return {
    title: state.reducer.title,
    todos: state.requestReducer.todos,
    isPending: state.requestReducer.isPending,
    error: state.requestReducer.error,
    todos: state.requestReducer.todos,
    isAddTodoPending: state.requestReducer.isAddTodoPending,
    error2: state.requestReducer.error2,
    isRMVTodoPending: state.requestReducer.isRMVTodoPending,
    error3: state.requestReducer.error3,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChange: (event) => dispatch(setInputField(event.target.value)),
    onRequestTodos: () => dispatch(requestTodos()),
    onRequestAddTodo: async (title, token) => {
      await dispatch(requestAddTodo(title, token))
      await dispatch(setInputField(''))

    },
    onRequestRMVTodo: async (id, token) => {
      await dispatch(requestRMVTodo(id, token))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);