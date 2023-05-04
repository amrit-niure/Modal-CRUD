import React from 'react'
import '../App.css';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Main() {
  const [value, setValue] = React.useState([])
  const [editValue,setEditValue] = useState({})
  const [show,setShow] = useState(false)

  React.useEffect(() => {
    fetchData();
  }, []); // fetches the data everytime the value updates. (when we update the user data. ) 


// renders the first table form the database
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api');
      setValue(response.data);
      // console.log(value[0].name)
    } catch (error) {
      console.error(error);
    }
  };
//  deletes the specific data
  const deleteData = async (id) => {
    try{
      await axios.delete(`http://localhost:8000/api/${id}`)
      setValue((prevData) => prevData.filter((data) => data._id !== id))
    }catch(error){
      console.error('Error deleting data:', error);
    }
  }
// it opens the modal and pre-populate the data in the modal using new state variable called editValue
const handleShow = (i) => {
    setShow(prevValue => !prevValue)
    console.log("THis now setes the new value of editvalue")
    const up = value[i]
    setEditValue(up)
}
const handleClose = () => setShow(false);

const handleChange = (event) => {
  const { name, value } = event.target;
  setEditValue({ ...editValue, [name]: value });
}

  // submits the modified data to make changes in database
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editValue);
    axios.put(`http://localhost:8000/api/${editValue._id}`, editValue)
      .then((response) => {
        console.log(response.data);
        fetchData()
      })
      .catch((error) => {
        console.log("Error while editing data");
      });
      handleClose()
  };


  return (
    <div className='main'>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
            </tr>

          </thead>
          <tbody>
            {value.map((user, index) => (
              <tr key={user.email}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td><button onClick={()=>deleteData(user._id)}>Del</button></td>
                <td><button onClick={() => handleShow(index)}>Edit</button></td>
              </tr>
            
            ))}
          </tbody>
        </table>
        <form>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input type='text' value={editValue.id} name ='id' onChange={handleChange}/>Id<br/>
              <input type='text' value={editValue.name} name='name'onChange={handleChange}/>Name<br/>
              <input type='text' value={editValue.email} name = 'email' onChange={handleChange}/>Email<br/>
              <input type='text' value={editValue.gender} name = 'gender' onChange={handleChange}/>Gender<br/>
            </Modal.Body>
           
            <Modal.Footer>
           
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit} >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      </div>
    </div>
  )
}

export default Main
