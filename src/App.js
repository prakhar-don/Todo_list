
import './App.css';
import {useState, useRef} from "react";
import { Header } from './components/Header';
import DoneIcon from '@mui/icons-material/Done';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {

  const [currentTask,setTask]=useState(" ");
  const [tasks,setItem]=useState([]);
  const [empty, setEmpty]=useState(true);

  const inputRef=useRef(null);
  
  function handleChange(event){
    return [setTask(event.target.value),setEmpty(false)];
  }

  function handleClick(){
      return [setItem([...tasks,{task:currentTask, completed:false}]), setTask(" "),setEmpty(true), inputRef.current.value=""]    
    
}
const deletItem=(item)=>{
  
    setItem(tasks.filter((val)=>{
      return item !== val.task;
    }))
  

}

const complete=(taskToDo)=>{

  setItem(tasks.map((task)=>{
    return(
      taskToDo == task.task ? {task : taskToDo , completed:true} : {task:task.task , completed: task.completed ? true :false}
    )
  }))

}
  return (
    <div className="App">
      <Header/>

      <div>
        <input type="text" placeholder="Enter the task" ref={inputRef}  onChange={handleChange} onKeyDown={(event)=>{if(event.keyCode===13 && !empty)  handleClick()}}/>
        <Fab color="primary" className='add'onClick={!empty ? handleClick : null}
        
        
        style={{padding:"10px",fontFamily:"monospace",backgroundColor:"red"}}> Add Item </Fab>
        

      </div>

      <hr/>

      <div>
        <ul>
          {tasks.map((value,key)=>{
            return(
              <>
              <div className='item'>
              <li>{value.task}</li>
              <button className="status" onClick={()=> complete(value.task)}>Completed</button>
              
              <button className="delete" onClick={()=>deletItem(value.task)}><DeleteIcon fontSize='medium'/></button>
              { value.completed ? <h1 className="right"> Task is completed <DoneIcon fontSize='large'/></h1> : <h1 className='wrong'>Task is not completed</h1> }
              </div></>
            )
          })}
        </ul> 
      </div>
     
    </div>
  );
}

export default App;
