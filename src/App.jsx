import { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

// const initialTasks = [
//   {
//     id: 1,
//     task: "Football",
//     time: "15:20",
//     done: false,
//   },
//   {
//     id: 2,
//     task: "Studying",
//     time: "08:20",
//     done: false,
//   },
// ];

TodoForm.propTypes = {
  handleAddNewTask: PropTypes.func,
};

TodoList.propTypes = {
  tasksLength: PropTypes.number,
};

TodoTask.propTypes = {
  task: PropTypes.object,
  srNo: PropTypes.number,
  handleDeleteTask: PropTypes.func,
  handleIsDone: PropTypes.func,
};

Footer.propTypes = {
  tasks: PropTypes.array,
};

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.done === true).length;
  const perc = Math.round((completedTasks * 100) / totalTasks);
  const dailyTaskDone = completedTasks === totalTasks;

  console.log(totalTasks, completedTasks, dailyTaskDone);

  function handleAddNewTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleDeleteTask(id) {
    // console.log(id);
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function handleIsDone(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : { ...task }
      )
    );
  }

  return (
    <div className="todolist-container">
      <Header />
      <TodoForm handleAddNewTask={handleAddNewTask} />
      <TodoList tasksLength={tasks.length}>
        {tasks.map((task) => (
          <TodoTask
            task={task}
            key={task.id}
            srNo={tasks.indexOf(task)}
            handleDeleteTask={handleDeleteTask}
            handleIsDone={handleIsDone}
          />
        ))}
      </TodoList>
      <Footer>
        {dailyTaskDone ? (
          <p style={{ textAlign: "center", width: "100%", fontSize: "20px" }}>
            🥳Congratulation !!! You have completed all your tasks for the day✅
          </p>
        ) : (
          <>
            <h3>🎯Total Tasks : {totalTasks}</h3>
            <h3>
              Task Completed : {completedTasks} / {totalTasks}{" "}
              {perc ? `(${perc}%)` : ""}
            </h3>
          </>
        )}
      </Footer>
    </div>
  );
}

function Header() {
  const [date, setDate] = useState(new Date().toDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(
    function () {
      setInterval(() => {
        setDate(new Date().toDateString());
        setTime(new Date().toLocaleTimeString());
      }, 1000);
    },
    [date, time]
  );

  return (
    <div className="header">
      <h2>📒Todo App📝</h2>
      <span>🌞{date}</span>
      <span>⏳{time}</span>
    </div>
  );
}

function TodoForm({ handleAddNewTask }) {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!task || !time) return;

    const newTask = {
      id: crypto.randomUUID(),
      task,
      time,
      done: false,
    };

    console.log(newTask);

    handleAddNewTask(newTask);

    setTask("");
    setTime("");
  }

  return (
    <div className="todoform">
      <form onSubmit={handleFormSubmit}>
        <table align="center">
          <tbody>
            <tr>
              <th colSpan={5}>✅Enter your Task for the Day✅</th>
            </tr>
            <tr>
              <td align="center">
                <label htmlFor="">Task</label>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Playing, Studying..."
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </td>
              <td align="center">
                <label htmlFor="">Time</label>
              </td>
              <td>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </td>
              <td align="center">
                <Button>Add Task</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

function TodoList({ tasksLength, children }) {
  return (
    <div className="todolist">
      {tasksLength ? (
        <table>
          <tbody>
            <tr id="tr-heading">
              <th style={{ width: "10%" }}>Sr No</th>
              <th style={{ width: "60%" }}>Task</th>
              <th style={{ width: "10%" }}>Time</th>
              <th style={{ width: "10%" }}>Delete</th>
            </tr>
            {children}
          </tbody>
        </table>
      ) : (
        <h1 className="message">Welcome to your Todo App🎯</h1>
      )}
    </div>
  );
}

function TodoTask({ task, srNo, handleDeleteTask, handleIsDone }) {
  function handleDone() {
    handleIsDone(task.id);
  }

  return (
    <tr className={task.done ? "linethrough" : ""}>
      <td align="center">
        <input onClick={handleDone} type="checkbox" />
        &nbsp; &nbsp;
        <span>{srNo + 1}</span>
      </td>
      <td align="center">{task.task}</td>
      <td align="center">{task.time}</td>
      <td align="center">
        <Button onClick={() => handleDeleteTask(task.id)}>Delete</Button>
      </td>
    </tr>
  );
}

function Footer({ children }) {
  return <div className="footer">{children}</div>;
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}
