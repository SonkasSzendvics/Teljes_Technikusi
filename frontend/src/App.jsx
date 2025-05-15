import { use, useState } from 'react'

import './App.css'
import './bootstrap.min.css'

function App() {
  const [count, setCount] = useState(0)
  const [list, setList] = useState([])
  const [loggedIn, setloggedIn] = useState(false)

  function getArtworks(){
    const getRequest = new XMLHttpRequest()
    getRequest.open('GET', 'http://127.1.1.1:3000/artworks')
    getRequest.send()
    //getRequest.setRequestHeader('Content-Type', 'Application/JSON')
    getRequest.onreadystatechange = () =>{
      if(getRequest.readyState == 4 && getRequest.status == 200){
        const result = JSON.parse(getRequest.response)
        setList(list => result)
      }
    }
  }

  function login(){
    const postRequest = new XMLHttpRequest()
    postRequest.open('POST', 'http://127.1.1.1:3000/login')
    postRequest.setRequestHeader('Content-Type', 'Application/JSON')
    postRequest.send(JSON.stringify({
      loginUser:loginUser.value,
      loginPass:loginPass.value
    }))
    postRequest.onreadystatechange = () =>{
      if(postRequest.readyState == 4 && postRequest.status == 200){
        const result = JSON.parse(postRequest.response)
        sessionStorage.setItem('token',result.token)
        console.log(result)
        alert(result.messages)   
        setloggedIn(true)
         
      }
    }
  }


  function postArt(){
    const postRequest = new XMLHttpRequest()
    postRequest.open('POST', 'http://127.1.1.1:3000/artworks')
    postRequest.setRequestHeader('Content-Type', 'Application/JSON')
    let token = sessionStorage.getItem('token')
    if (token) {
      postRequest.setRequestHeader("Authorization", `${token}`);
    }
    postRequest.send(JSON.stringify({
      newTitle: newTitle.value,
      newValue: newValue.value
    }))
    postRequest.onreadystatechange = () =>{
      if(postRequest.readyState == 4 && postRequest.status == 200){
        const result = JSON.parse(postRequest.response)

        console.log(result)
        alert(result.messages)   
        
         
      }
    }
  }


  function deleteArt(id){
    const deleteRequest = new XMLHttpRequest()
    deleteRequest.open('DELETE', 'http://127.1.1.1:3000/artworks/'+id)
    let token = sessionStorage.getItem('token')
    if (token) {
      deleteRequest.setRequestHeader("Authorization", `${token}`);
    }
    deleteRequest.send()
    deleteRequest.onreadystatechange = () =>{
      if(deleteRequest.readyState == 4 && deleteRequest.status == 200){
        const result = JSON.parse(deleteRequest.response)

        console.log(result)
        alert(result.messages)   
        
         
      }
    }
  }

  return (
    <>
      <header>
        <h1>Műalkotás gyűjtemény</h1>
      </header>

      <main className='col-lg-12 col-sm-8 col-md-8'>
        <div className='m-5 p-3'>
    <ul>
      {list.map(item => (
        <li key={item.id}> Mű alkotás neve:{item.title}, műalkotás értéke: {item.value}
        {loggedIn ? <button onClick={() => deleteArt(item.id)}>Törlés</button> : false}  </li>
      ))}
    </ul>
      <button onClick={() => getArtworks()}>Műalkotások listázása</button>
      </div>


      
      <div className='m-5 p-3'>
        <label htmlFor="loginUser">Felhasználónév:  </label><input className='p-2' type="text" id='loginUser' name='loginUser' /><br /> <br />
        <label htmlFor="loginPass" className='p-2'>Jelszó:  </label><input className='p-2' type="password" id='loginPass' name='loginPass' /><br /> <br />
        <button onClick={() =>login()}>Bejelentkezés</button>

      </div>

      <div className='m-5 p-3'>
        {loggedIn 
        ? <>
        <label htmlFor="newTitle">Cím: </label><input className='p-2' type="text" id='newTitle' name='newTitle' /> <br /> <br />
        <label htmlFor="newValue">Ár:  </label><input className='p-2' type="text" id='newValue' name='newValue' /><br /> <br />
        <button onClick={() =>postArt()}>Hozzáadása</button>
        </> : false}

      </div>

      <footer>Kovács Zétény -- 13k_sz</footer>
      </main>

      
    </>
  )
}


export default App
