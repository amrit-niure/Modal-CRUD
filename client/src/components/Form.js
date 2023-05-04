import React from 'react'
import axios from 'axios';
function Form() {
  
  const [value,setValue] = React.useState({
    id:'',
    name:'',
    email:'',
    gender:''
  })

  // send data to server using axios 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);

    // send data to server using axios
    axios.post('http://localhost:8000/api/user', value)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("Problem in here");
      });
  };


  return (
    <div className='form'>
      <form action="#" onSubmit={handleSubmit} >
        <input type="text"  onChange={(e)=>{setValue({...value,id:e.target.value})}
        } name='id' />
        <label htmlFor="name" id='hidden'>Name </label>
        <input 
        type="text" 
        id='name' 
        name='name'
        value={value.name}
        onChange={(e)=>setValue({...value,name:e.target.value})}
        />
        <br /><br />
        <label htmlFor="email">Email </label>
        <input 
        type="text" 
        id='email' 
        name='email'
        value={value.email}
        onChange={(e)=>{setValue({...value,email:e.target.value})}}
        />
        <br /><br />
        <label htmlFor="gender">Male</label>
        <input 
        type="radio" 
        name='gender' 
        id='gender' 
        value='male'
        checked={value.gender === 'male'} // this is just to set the default value we can ignore this 
        onChange={(e) => setValue({ ...value, gender: e.target.value })}
        />
        <label htmlFor="gender">Female</label>
        <input 
        type="radio" 
        name='gender' 
        id='gender' 
        value='female'
        checked={value.gender === 'female'} // this is just to set the default value we can ignore this 
        onChange={(e) => setValue({ ...value, gender: e.target.value })}
        />
        <br /><br />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default Form
