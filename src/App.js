import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { firestore } from './index';
import Task from './Task';

function App() {

  const [tasks, setTask] = useState([

    {
      id: 1, name: 'Home Work'
    },
    {
      id: 2, name: 'Write node js'
    }

  ])

  const [name, setName] = useState('');

  useEffect(() => {
    retriveData()
  }, [])


  const retriveData = () => {

    firestore.collection('task').onSnapshot((snapshot) => {
      console.log(snapshot.docs)
      const mytask = snapshot.docs.map(d => {
        const { id, name } = d.data();
        console.log(id, name)
        return { id, name }
      })
      setTask(mytask)
    })
  }

  const deleteTask = (id) => {
    firestore.collection('task').doc(id + '').delete()
  }

  const editTask = (id) => {
    firestore.collection('task').doc(id + '').set({ id, name })
  }


  const renderTask = () => {
    if (tasks && tasks.length)
      return (
        tasks.map((tasks, index) => {
          return (
            <Task key={index} task={tasks}
              deleteTask={deleteTask}
              editTask={editTask}

            />
          )
        })
      )
    else
      return (<li>No Task</li>)

  }

  const addTask = () => {
    let id = tasks.length > 0 ? +tasks[tasks.length - 1].id + 1 : 1;
    firestore.collection('task').doc(id + ('')).set({ id, name })
  }


  return (
    <div >
      <h1>React + Firebase Firestore CRUD</h1>
      <h4>Affan Pathan 6035512016</h4>
      <input type='text' name='name' onChange={(e) => { setName(e.target.value) }} />
      <div>
        <button onClick={addTask}>Submit</button>
      </div>
      <ul className='layer'>{renderTask()}</ul>
    </div>
  );
}
export default App;






// import React, { useState, useEffect } from 'react'
// import { firestore } from './index'
// import 'firebase/firestore'
// const App = () => {
//   useEffect(() => {
//     Data_firebase()
//   })
//   const [tasks, setTasks] = useState([
//   ]);
//   const [name, setName] = useState('');
//   const Data_firebase = () => {
//     firestore.collection('task').onSnapshot((snapshot) => {
//       let tasksfirebase = snapshot.docs.map(data => {
//         const { id, name } = data.data()
//         return { id, name }
//       })
//       setTasks(tasksfirebase)
//     })
//   }
//   const renderTask = () => {
//     if (tasks && tasks.length) {
//       return tasks.map((text, index) => {
//         return (
//           <ul key={index}>
//             <li>{text.id}:{text.name}</li>
//           </ul>
//         )
//       })
//     }
//     else {
//       return <li>No task</li>
//     }
//   }
//   const addTask = () => {
//     let id = tasks.length !== 0 ? tasks[tasks.length - 1].id + 1 : 1
//     firestore.collection('task').doc(id.toString()).set({ id, name })
//   }
//   return (
//     <div>
//       <div>
//         <input onChange={(e) => setName(e.target.value)} />
//         <div>
//           <button onClick={addTask}>Submit</button>
//         </div>
//       </div>
//       {
//         renderTask()
//       }
//     </div>
//   )
// }
// export default App;