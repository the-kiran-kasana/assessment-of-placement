import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
    const [users, setUsers] = useState([])

    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/todos/3")
      .then(res => res.json())
      .then(data => setUsers([data]))
      .catch((err) => console.log(err))
    },[])


    const styles = {
      main: {
        padding: '20px',
      },
      title: {
        color: '#5C6AC4'
      },
    };

  return (
    <>
      <div style={styles.main}>
           <h1 style={styles.title}>Hello, World!</h1>
           <div>
             <button onClick={() => setCount((count) => count + 1)}>count {count} </button>

             {
               users.map((user) => (
                  <div key={user.id}>
                    <h1>title : {user.title}</h1>
                    <h1>status : {user.completed.toString()}</h1>
                  </div>
               ))
             }


           </div>
         </div>
    </>
  )
}

export default App




