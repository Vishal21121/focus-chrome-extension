import { useState, useEffect } from "react";

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

  const [fetchTasksFlag, setFetchTasksFlag] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched tasks:", data);
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

  useEffect(() => {
    fetchTasks()
  }, []);

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
        fetchTasks()
        setTask("")
        setDate("")
        console.log("Task added successfully!");
      } else {
        console.error("Error adding task:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  // Filter tasks for today
  const todaysTasks = taskList.filter(
    (taskItem) => taskItem.date === currentDate
  );

  return (
    <div className="container p-4 max-w-[400px] min-h-[600px]">
      <div>
        <h1 className="text-2xl font-bold mb-4">Add Tasks</h1>
        <input
          type="text"
          placeholder="Enter Task Name"
          value={task}
          onChange={handleTaskInput}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="date"
          placeholder="Enter Due Date"
          value={date}
          onChange={handleDateInput}
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
        <h1 className="text-2xl font-bold mt-4 mb-2">Today's Tasks</h1>
        <ul>
          {todaysTasks.map((taskItem, index) => (
            <li
              key={index}
              className="border p-2 mb-2 rounded bg-gray-100"
            >
              {taskItem.task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
