import React from 'react';
import './App.css';
import { useState } from 'react';
import { CompletionInfoFlags } from 'typescript';



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

// type todo = {
//   id: number;
//   name: string;
//   done: boolean;
// }

// const data = fetch('http://localhost:5000/tasks').then((response) => response.json());
// console.log(data);




function App() {
  let person= ({
    name: "Veronica",
    theme: {backgroundColor: 'black',color: 'aqua',width: '750px' ,margin: 'auto',padding: '150px'},
    today: new Date(),
    tasks: [
      { id: 1 ,
        name: "Learn React", 
        done: true
      }, 
      {
        id: 2 ,
        name: "Learn TypeScript", 
        done: true
      }, 
      {
        id: 3 ,
        name: "Learn Redux", 
        done: false
      },
      {
        id: 4 ,
        name: "Learn LLM", 
        done: false
      }
    ]
  });


  const [personState,setPersonState] = useState<person>(person)
  const [addtask, setAddtask] = useState<string>('');
  const [taskcomplition, setTaskcomplition] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<number>(person.tasks.length + 1);
  const [checked, setChecked] = useState<boolean>(false);
  

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
    person.tasks = newTasks.tasks;
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

      person.tasks = updatedTasks;

      setPersonState({
        ...personState,
        tasks: updatedTasks,
      });
      
    }

    function handleCompleted() {
      if (checked === false) {
        setChecked(true);
      
      const completedTasks = personState.tasks.filter((task) => task.done);
      setPersonState({
        ...personState,
        tasks: completedTasks,
      });
      }else {
        setChecked(false);
        setPersonState(person);
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
