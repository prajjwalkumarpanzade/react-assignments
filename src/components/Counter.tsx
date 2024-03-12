import { useState } from "react";

const Counter = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [age,setAge] = useState('');
  const display = () => {
    console.log(name);
    console.log(email);
    console.log(age);
  }
  return (
    <div>
       <h1>Data</h1>
        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" > Name </input>
        <input value = {email} onChange={(e) => setName(e.target.value)} type="text"> Email </input>
        <input value = {age} onChange = {(e) => setAge(e.target.value)} type="text"> Age </input>
        <button onClick={display}>Submit</button>
    </div>
)
}

export default Counter;