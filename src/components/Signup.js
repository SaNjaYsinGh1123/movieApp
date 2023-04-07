import React from 'react'
import {Bars} from 'react-loader-spinner';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { getAuth, RecaptchaVerifier ,signInWithPhoneNumber} from "firebase/auth";
import app, { userRef } from '../firebase/firebase'
import swal from 'sweetalert';
import { async } from '@firebase/util';
import { addDoc ,query,where,getDocs} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const auth = getAuth(app);


const Signup = () => {
  const navigate = useNavigate();
  const [form,setForm] = useState({
    name:'',
    mobile:'',
    password:''
      });
  const [loading,setLoading] = useState(false);
  const [otpSent,setOtpSent] = useState(false);
  const [otp,setOtp] = useState();

  

  const recaptchaGenerator = ()=>{
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  }
  

  const reset = ()=>{
    form.name = ''
    form.mobile = ''
    form.password = ''
  }

  const requestOtp = async()=>{
    setLoading(true);
    if(form.name === '' || form.mobile === '' || form.password === ''){
      swal({
        text: 'please fill all fields',
        icon: 'warning',
        buttons: false,
        timer:3000,
      });
      setLoading(false);
    }else if(form.mobile.length !== 10 ){
      swal({
        text: 'please fill correct mobile no',
        icon: 'warning',
        buttons: false,
        timer:3000,
      });
      setLoading(false);
    }
    else{
    const quer = query(userRef, where('mobile','==', form.mobile));
    const querySnapShot =  await getDocs(quer);

    if(querySnapShot.docs.length > 0){
      swal({
        text: 'This phone no is already registered',
        icon: 'warning',
        buttons: false,
        timer:3000,
      });
      reset();
      setLoading(false);
    }
    else{
        recaptchaGenerator();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth,`+91${form.mobile}`, appVerifier)
        .then(confirmationResult =>{
        window.confirmationResult = confirmationResult;
          swal({
            text: 'OTP sent',
            icon: 'success',
            buttons: false,
            timer:3000,
          });
          setOtpSent(true);
          setLoading(false); 
        }).catch((error)=>{
          console.log(error)
        });
    }
 }
}
 const upload = async ()=>{
    try{
      // var salt = bcrypt.genSaltSync(10);
      // var hash = bcrypt.hashSync(form.password, salt);
      //console.log('hash',hash);
      await addDoc(userRef, {
        name: form.name,
        password: form.password,
        mobile: form.mobile
      });
    }catch(err){
      console.log(err);
    }
 }
  const otpverify =async ()=>{
    try{
      setLoading(true);
      window.confirmationResult.confirm(otp).then((result) =>{
        upload();
        swal({
          text: 'successfully Registered',
          icon: "success",
          buttons:false,
          timer:3000
        });
        setLoading(false);
        navigate('/login')
      })
    } catch(err){
      console.log(err);
    }   
  }
  

  return (
      <div className='w-full mt-8 flex flex-col items-center'>
       {otpSent ?
        <> 
          <h1 className='text-xl font-bold'>Verify OTP</h1>
          <div className="p-2 md:w-1/3 w-5/6">
                  <div className="relative">
                      <label htmlFor="otp" className="leading-7 text-sm text-white ml-1">OTP</label>
                      <input
                          name="otp"
                          type={'number'} 
                          className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-8 transition-colors duration-200 ease-in-out"
                        onChange={(e)=>setOtp(e.target.value)}  
                      />
                      
                  </div>
          </div>
          <div className="p-2 w-full mt-2">
                    <button className="flex mx-auto text-white bg-purple-700 border-0 py-2 px-8 focus:outline-none hover:bg-purple-900 rounded text-lg" 
                        onClick={otpverify}>
                        {loading?<Bars height={20} color='white'/>:'Confirm OTP'}
                    </button>
        </div>
        </>
       :
        <>
         <h1 className='text-xl font-bold'>Sign-up</h1>
         <div className="p-2 md:w-1/3 w-5/6">
                <div className="relative">
                    <label htmlFor="name" className="leading-7 text-sm text-white">Name</label>
                    <input
                        name="name"
                        className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-8 transition-colors duration-200 ease-in-out"
                        value={form.name}
                        onChange={(e)=>setForm({...form,name:e.target.value})}  
                    />
                    
                </div>
         </div>
         <div className="p-2 md:w-1/3 w-5/6">
                <div className="relative">
                    <label htmlFor="mobile" className="leading-7 text-sm text-white">Mobile no</label>
                    <input
                        name="mobile"
                        type={'number'} 
                        value={form.mobile}
                        className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-8 transition-colors duration-200 ease-in-out"
                       onChange={(e)=>setForm({...form,mobile:e.target.value})}  
                    />
                    
                </div>
         </div>
         <div className="p-2 md:w-1/3 w-5/6">
                <div className="relative">
                    <label htmlFor="password" className="leading-7 text-sm text-white">Password</label>
                    <input
                    type='password'
                        name="password" 
                        value={form.password}
                        className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-8 transition-colors duration-200 ease-in-out"
                        onChange={(e)=>setForm({...form,password:e.target.value})}  
                    />
                </div>
         </div>
         <div className="p-2 w-full mt-2">
                    <button className="flex mx-auto text-white bg-purple-700 border-0 py-2 px-8 focus:outline-none hover:bg-purple-900 rounded text-lg" 
                        onClick={requestOtp}>
                        {loading?<Bars height={20} color='white'/>:'Request-OTP'}
                    </button>
        </div>
        </>
      }
        <div>
             <p>Already have an account ? <Link to='/login'>
                   <span className='text-blue-500 ml-1'>login</span>
                </Link>
            </p> 
        </div>
        <div id='recaptcha-container'>

        </div>
     </div>
  )
}

export default Signup