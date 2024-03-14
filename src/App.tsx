import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

type person = {
  name: string;
  theme: {
    backgroundColor: string;
    color: string;
    width: string;
    margin: string;
    padding: string;
  };
  today: Date;
  tasks: {
    id: number;
    name: string;
    done: boolean;
  }[];
};

function App() {
  const [personState, setPersonState] = useState<person>({
    name: "Veronica",
    theme: { backgroundColor: 'black', color: 'aqua', width: '750px', margin: 'auto', padding: '150px' },
    today: new Date(),
    tasks: []
  });

  const [addtask, setAddtask] = useState<string>('');
  // const [taskId, setTaskId] = useState<number>((personState.tasks.length) + 1);
  const [checked, setChecked] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
  
      try {
        const response = await fetch('http://localhost:8000/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPersonState({ ...personState, tasks: data });
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  async function fetchTasks() {
    const response = await fetch('http://localhost:8000/tasks');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }

  async function addTask(task: { id: number, name: string, done: boolean }) {
    const response = await fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
    return response.json();
  }

  async function removeTask(taskId: number) {
    
      const response = await fetch(`http://localhost:8000/tasks/${taskId}`, { method: 'DELETE' });
  
      
    
  }
  
  

  async function updateTask(task: { id: number; name: string; done: boolean }) {
    const response = await fetch(`http://localhost:8000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
  }

  function handlesubmitTask() {
    let newId = 1; // Start with 1 if no tasks exist
    if (personState.tasks.length > 0) {
      // Find the highest existing ID
      newId = Math.max(...personState.tasks.map((task) => task.id)) + 1;
    }
    const newTask = { id: newId, name: addtask, done: false };
    // setTaskId(taskId + 1);
    setAddtask('');

    addTask(newTask).then(() => {
      fetchTasks().then((tasks) => {
        setPersonState({ ...personState, tasks: tasks });
      });
    });
  }

  function handleTaskCompletionChange(task: { id: number; name: string; done: boolean }) {
    const updatedTasks = personState.tasks.map((existingTask) =>
      existingTask.id === task.id ? { ...existingTask, done: !existingTask.done } : existingTask
    );

    setPersonState({
      ...personState,
      tasks: updatedTasks,
    });

    updateTask(task).catch((err) => {
      console.error(err);
      // Revert the state if the update fails
      setPersonState({
        ...personState,
        tasks: personState.tasks.map((existingTask) =>
          existingTask.id === task.id ? { ...existingTask, done: !existingTask.done } : existingTask
        ),
      });
    });
  }

async function handleRemove(taskId: number) {
  try {
    // Remove the task from the local state
    setPersonState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== taskId),
    }));

    // Send a DELETE request to remove the task from the server
    const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove task');
    }

    // Task removed successfully (server-side)
  } catch (err) {
    console.error('Error removing task:', err);
    // Handle server-side deletion failure (optional)
  }
}
  

  async function handleCompleted() {
    if (checked === false) {
      setChecked(true);

      const completedTasks = personState.tasks.filter((task) => task.done);
      setPersonState({
        ...personState,
        tasks: completedTasks,
      });
    } else {
      setChecked(false);
      fetchTasks().then((tasks) => {
        setPersonState({ ...personState, tasks: tasks });
      });
    }
  }

  function formatDate(date: Date) {
    return date.toDateString();
  }

  function TaskStatus(task: { name: string, done: boolean }) {
    if (task.done) {
      return <li> {task.name} ✔</li>
    } else {
      return <li> {task.name} </li>
    }
  }

  return (
    <div className="App" style={personState.theme}>
      <h1>{personState.name}'s TODO LIST</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      ></img>

      <h2>Today is {formatDate(personState.today)}</h2>
      <h3>Todays TODO List</h3>
      <div>
        <input
          type="text" placeholder='Add a new task'
          value={addtask}
          onChange={(e) => setAddtask(e.target.value)}
          autoFocus
        />
        <br />
        <br />
        <button type="submit" onClick={handlesubmitTask}>Add Task</button> &nbsp; &nbsp;

        <input type='checkbox' onClick={handleCompleted} />Completed Tasks

      </div>


      <div >
        {Loading && <p>Loading....</p>}
        {error && <p>Failed to fetch data</p>}
        {personState.tasks.map((task) => (
          <label style={{ display: 'flex', margin: '20px', padding: 'auto' }} key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => handleTaskCompletionChange(task)} />{TaskStatus(task)}
            &nbsp;&nbsp;<button onClick={() => handleRemove(task.id)}>Remove</button>


          </label>
        ))}
      </div>


    </div>
  );
}

export default App;
