import Header from "./Header";
import Footer from "./Footer";
import Cards from "./Cards";
import Addmovie from "./Addmovie";
import {Route, Routes} from 'react-router-dom';
import Detail from "./Detail";
import Login from "./Login";
import Signup from "./Signup";

import {createContext, useState,useEffect} from 'react'

const Appstate = createContext();
function App() {
  function clearStorage() {

    let session = sessionStorage.getItem('login');

    if (session == null) {
    
        localStorage.clear();

    }
    sessionStorage.setItem('login', 1);
}
// window.addEventListener('load', clearStorage);
  clearStorage();
  
  const getLocalDataUser=()=>{
    let localDataUser = localStorage.getItem('user');
    if(localDataUser === null ||localDataUser === 'undefined'){
      return '';
    }
    else{
      return  JSON.parse(localDataUser);
    }
  }
 
  const [login,setLogin] = useState(false);
  const [user,setUser] = useState(getLocalDataUser());
  
  useEffect(()=>{

    localStorage.setItem('user',JSON.stringify(user));

    if(user === '')
    {
      setLogin(false);
    }
    else{
      setLogin(true);
    }
    
  },[user])
  return (
    <Appstate.Provider value={{login,user,setLogin,setUser}}>
       <div className="App relative">
          <Header />

          <Routes>
            <Route path="/" element={<Cards/>}/>
            <Route path="/addmovie" element={<Addmovie />}/>
            <Route path="/detail/:id" element={<Detail />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
          </Routes>

          <Footer/>
       </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};