import React, { useContext, useState } from 'react'
import {Bars} from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import {movieRef} from '../firebase/firebase.js'
import { async } from '@firebase/util';
import swal from 'sweetalert';
import { Appstate } from './App.js';
import { useNavigate } from 'react-router-dom';
const Addmovie = () => {
    const [form,setForm] =useState({
        title:'',
        year:0,
        description:'',
        image:'',
        rating:0,
        noOfRaters:1
    });

    
    const useAppstate = useContext(Appstate);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const add =async ()=>{
        setLoading(true);
        try{
            if(useAppstate.login){
                await addDoc(movieRef,form);
                swal({
                    title: "Successfully Added",
                    icon: "success",
                    timer:3000
                });
               setLoading(false);
            }else{
                swal({
                    title: "You need to login first",
                    icon: "error",
                    timer:3000
                });
              navigate('/login');
            }
       }
       catch(err){
        swal({
            title: "error",
            text: `${err}`,
            icon: "success",
            dangerMode: true,
          });
       }
    } 
    return (
        <div>
            <form onSubmit={add}>
            <section className="text-white body-font relative">
                <div className="container px-5 py-8 mx-auto">
                    <div className="flex flex-col text-center w-full mb-4">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Add Movie</h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-white">Title</label>
                                    <input type="text"
                                       id="name" 
                                       name="name" 
                                       required
                                       className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                       onChange={(e)=>setForm({...form,title:e.target.value})}
                                       />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="year" className="leading-7 text-sm text-white">Year</label>
                                    <input type="text" 
                                      id="year" 
                                      name="year" 
                                      required
                                      className="w-full  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                      onChange={(e)=>setForm({...form,year:e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="image" className="leading-7 text-sm text-white">Image link</label>
                                    <input
                                      name="image" 
                                      required
                                      className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-8 transition-colors duration-200 ease-in-out"
                                      onChange={(e)=>setForm({...form,image:e.target.value})}  
                                    />
                                    
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="discription" className="leading-7 text-sm text-white">Discription</label>
                                    <textarea id="discription" 
                                      name="discription" 
                                      required
                                      className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                      onChange={(e)=>setForm({...form,description:e.target.value})}
                                      >
                                      </textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button  type='submit' className="flex mx-auto text-white bg-purple-700 border-0 py-2 px-8 focus:outline-none hover:bg-purple-900 rounded text-lg" 
                                   >
                                  {loading?<Bars height={20} color='white'/>:'Button'}
                                </button>
                            </div>
                            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </form>
        </div>
    )
}

export default Addmovie