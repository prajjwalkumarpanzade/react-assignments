import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import { CompletionInfoFlags } from 'typescript';
import { TIMEOUT } from 'dns';



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
  tasks: 
    {
      id: number;
      name: string;
      done: boolean;
    }[];

}

function App() {
  const [personState,setPersonState] = useState<person>({
    name: "Veronica",
    theme: {backgroundColor: 'black',color: 'aqua',width: '750px' ,margin: 'auto',padding: '150px'},
    today: new Date(),
    tasks: []
  });


  // const [personState,setPersonState] = useState<person>(person)
  const [addtask, setAddtask] = useState<string>('');
  const [taskcomplition, setTaskcomplition] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<number>((personState.tasks.length)+1);
  const [checked, setChecked] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);
  
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

    try {
      const response = await fetch('http://localhost:8000/tasks')
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPersonState({...personState,tasks:data});
      }
      catch (err) {
        setError(true);
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();
    },[])

  function handlesubmitTask(){
    console.log(taskId, addtask, taskcomplition)

    setTaskId(taskId + 1);
    setAddtask(addtask);
    setTaskcomplition(false); 
    const newTasks = {
      ...personState,
      tasks: [...personState.tasks, {id: taskId, name: addtask, done: taskcomplition}]  
    }
    setPersonState(newTasks) 
    personState.tasks = newTasks.tasks;
    setAddtask('');
    
  }

 
   function handleTaskCompletionChange(task: { id: number; done: boolean }) {
    const updatedTasks = personState.tasks.map((existingTask) =>
      existingTask.id === task.id ? { ...existingTask, done: !task.done } : existingTask
      );

      setPersonState({
        ...personState,
        tasks: updatedTasks,
      });
    
    }

  function handleRemove(task: { id: number; done: boolean }) {
    
    const updatedTasks = personState.tasks.filter((existingTask) =>
      existingTask.id !== task.id
      );

      personState.tasks = updatedTasks;

      setPersonState({
        ...personState,
        tasks: updatedTasks,
      });
      
    }

    async function handleCompleted() {
      if (checked === false) {
        setChecked(true);
      
      
      const completedTasks = personState.tasks.filter((task) => task.done);
      setPersonState({
        ...personState,
        tasks: completedTasks,
      });
      }else {
        setChecked(false);
        const response = await fetch('http://localhost:8000/tasks')
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPersonState({...personState,tasks:data});
    
      }
    }
     
    
  
  
  function formatDate(date: Date) {
    return date.toDateString();
  }
  
  function TaskStatus(task: {name: string, done: boolean}) {
    if (task.done) {
      return <li> {task.name} ✔</li>
    } else {
      return <li> {task.name} </li>
    }
  }
  

 
  
  return (
    <div className="App" style = {personState.theme}>
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
          onChange={(e)=> setAddtask(e.target.value)}
          autoFocus
        />
        <br/>
        <br/>
        <button type = "submit" onClick={handlesubmitTask}>Add Task</button> &nbsp; &nbsp;

        <input type= 'checkbox' onClick={handleCompleted}/>Completed Tasks
       
      </div>


      <div >
        {Loading && <p>Loading....</p>}
        {error && <p>Failed to fetch data</p>}        
        {personState.tasks.map((task) => (
          <label style={{display:'flex',margin:'20px',padding:'auto'}}>
            <input 
              type="checkbox" 
              checked={task.done}
              onChange={()=>  handleTaskCompletionChange(task)} />{TaskStatus(task)}
              &nbsp;&nbsp;<button onClick={() => handleRemove(task)}>Remove</button>
              
            
            </label>
        ))}
      </div>
      
      
    </div>
  );
}






export default App;
