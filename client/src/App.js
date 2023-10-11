import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleTaskInput = (e) => {
    setTask(e.target.value);
  };

  const handleDateInput = (e) => {
    setDate(e.target.value);
  };

  const handleAddTask = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, date }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTaskList([...taskList, newTask]);
        console.log("Task added successfully!");
      } else {
        console.error("Error adding task:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        if (response.ok) {
          const data = await response.json();
          // Convert API date format to 'YYYY-MM-DD'
          const formattedTasks = data.map((taskItem) => ({
            ...taskItem,
            date: taskItem.date.split("T")[0],
          }));
          setTaskList(formattedTasks);
        } else {
          console.error("Error fetching tasks:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Filter tasks for today
  const todaysTasks = taskList.filter(
    (taskItem) => taskItem.date === currentDate
  );

  return (
    <div>
      <div>
        <h1>Add Tasks</h1>
        <input
          type="text"
          placeholder="Enter Task Name"
          value={task}
          onChange={handleTaskInput}
        />
        <input
          type="date"
          placeholder="Enter Due Date"
          value={date}
          onChange={handleDateInput}
        />
        <button onClick={handleAddTask}>Add</button>
        <h1>Today's Tasks</h1>
        <ul>
          {todaysTasks.map((taskItem, index) => (
            <li key={index}>{taskItem.task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
