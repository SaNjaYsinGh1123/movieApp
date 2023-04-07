import React, { useContext, useRef, useState } from 'react';
import {Bars} from 'react-loader-spinner';
import {Link, useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import {query,where, getDocs} from 'firebase/firestore';
import {userRef}  from '../firebase/firebase';
import {bcrypt} from 'bcryptjs';
import {Appstate} from "./App";
import { movieRef } from '../firebase/firebase';

const Login = () => {
    const useAppstate = useContext(Appstate);
    const navigate = useNavigate();
    const [form,setForm] = useState({
        mobile:'',
        password:''
    });
    const [loading,setLoading] = useState(false);

    const login =async ()=>{
        setLoading(true);
        try{ 
            const quer = query(userRef, where('mobile','==', form.mobile));
            const querySnapShot =  await getDocs(quer);
            console.log('query',querySnapShot);
            console.log('query',querySnapShot.docs);
            if(querySnapShot.docs.length > 0)
            {
            querySnapShot.forEach((doc) =>{
                const _data = doc.data();
               
                //const isvalidUser = bcrypt.compareSync(form.password, _data.password);
                if(form.password === _data.password){
                    useAppstate.setLogin(true);
                    useAppstate.setUser(_data.name);
                    navigate('/');
                    swal({
                        text: 'Logged In',
                        icon: "success",
                        buttons:false,
                        timer:3000
                      });
                    setLoading(false);
                }else{
                    swal({
                        text: 'invalid mobile no or password',
                        icon: "error",
                        buttons:false,
                        timer:3000
                      });
                    setLoading(false);
                }
            })
        }else{
            swal({
                title: 'error',
                text: 'invalid mobile no or password',
                icon: "error",
                buttons:false,
                timer:3000
              });
              setLoading(false);
        }
      }catch(err){
        swal({
            title: 'error',
            text: err.message,
            icon: "error",
            buttons:false,
            timer:3000
          });
          setLoading(false);

      }
    }
  return (
    <div className='w-full mt-8 flex flex-col items-center'>
         <h1 className='text-xl font-bold'>Login</h1>
         <div className="p-2 md:w-1/3 w-5/6">
                <div className="relative">
                    <label htmlFor="mobile" className="leading-7 text-sm text-white">Mobile no</label>
                    <input
                        name="mobile"
                        type={'number'} 
                        className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-8 transition-colors duration-200 ease-in-out"
                       onChange={(e)=>setForm({...form,mobile:e.target.value})}  
                    />
                    
                </div>
         </div>
         <div className="p-2 md:w-1/3 w-5/6">
                <div className="relative">
                    <label htmlFor="password" className="leading-7 text-sm text-white">Password</label>
                    <input
                        name="password" 
                        className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-8 transition-colors duration-200 ease-in-out"
                        onChange={(e)=>setForm({...form,password:e.target.value})}  
                    />
                </div>
         </div>
         <div className="p-2 w-full">
                    <button className="flex mx-auto text-white bg-purple-700 border-0 py-2 px-8 focus:outline-none hover:bg-purple-900 rounded text-lg" 
                        onClick={login}>
                        {loading?<Bars height={20} color='white'/>:'Login'}
                    </button>
        </div>
        <div>
             <p>Don't have account ? <Link to='/signup'>
                   <span className='text-blue-500 ml-1'>Sign Up</span>
                </Link>
            </p> 
        </div>
     </div>
     )

     
}

export default Login;