import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';
import {app,database} from './firebaseConfig';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {collection,addDoc,getDocs,doc,updateDoc,deleteDoc} from 'firebase/firestore'

function App() {
  const [array,setArray]=useState([]);
  const [data, setData] = useState({
    name:'',
    email: '',
    password: ''
  })
  const auth=getAuth();
  const dbInstance=collection(database,'users')
  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value }

    setData({ ...data, ...inputs })
  }
  const handleSubmit=()=>{
   addDoc(dbInstance,data)
   .then(()=>{
     alert('Data Sent')
   })
   .catch((err)=>{
    alert(err.message)
   })
  }
  const getData=async()=>{
   const data=await getDocs(dbInstance)
   setArray(data.docs.map((item)=>{
     return {...item.data(),id:item.id}
   }))
  }
  const updateData=(id)=>{
    let dataToUpdate=doc(database,'users',id)
    updateDoc(dataToUpdate,{
      name:"Ashih",
      email:"ashishisbalh@gmail.com",
      password:"abcdef"
    }).then(()=>{
      alert('Data Updated')
      getData()
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const deleteData=(id)=>{
    let dataTodelete=doc(database,'users',id)
    deleteDoc(dataTodelete)
    .then(()=>{
      alert('Data Deleted')
      getData()
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
   getData()
  },[])
  return (
   
    <div className="App-header">
       
      <input
        placeholder="Name"
        name="name"
        type="text"
        className="input-fields"
        onChange={event => handleInputs(event)}
      />
    <input
        placeholder="Email"
        name="email"
        type="email"
        className="input-fields"
        onChange={event => handleInputs(event)}
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        className="input-fields"
        onChange={event => handleInputs(event)}
      /> 
      <button onClick={getData}>Get Data</button>
    
      {array.map((item)=>{
        return(
     <div><p>{item.name}</p>
     <p>{item.email}</p>
     <p>{item.password}</p>
     <button onClick={()=>updateData(item.id)}>Update</button>
     <button onClick={()=>deleteData(item.id)}>Delete</button>
     <hr/>
     </div>
     )
   })}
    </div>
  );
}

export default App;
