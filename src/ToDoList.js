import React, { Component } from "react";

class ToDoList extends Component {
  state = {
    tasks: [
      { id: 1, name: "Завдання 1" },
      { id: 2, name: "Завдання 2" },
      { id: 3, name: "Завдання 3" },
    ],
    newTaskName: "",
  };

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      this.setState({ tasks });
    }
  }

  addTask = () => {
    const { newTaskName, tasks } = this.state;
    if (!newTaskName) return;
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask = {
      id: newId,
      name: newTaskName,
    };
    const newTasks = [...tasks, newTask];
    this.setState({ tasks: newTasks, newTaskName: "" });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  deleteTask = (taskId) => {
    const newTasks = this.state.tasks.filter((task) => task.id !== taskId);
    this.setState({ tasks: newTasks });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  clearTasks = () => {
    this.setState({ tasks: [] });
    localStorage.removeItem("tasks");
  };

  render() {
    const { tasks, newTaskName } = this.state;
    return (
      <div className="container">
        <div className="container-content">
          <input
            className="input"
            placeholder="new task"
            value={newTaskName}
            onChange={(e) => this.setState({ newTaskName: e.target.value })}
          />
          <button className="addBtn" onClick={this.addTask}>
            Додати
          </button>
          <button className="addBtn" onClick={this.clearTasks}>
            Очистити список
          </button>
          <ul className="list">
            {tasks.map((task) => (
              <li className="list-items" key={task.id}>
                {task.name}
                <button
                  className="addBtn"
                  onClick={() => this.deleteTask(task.id)}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ToDoList;
