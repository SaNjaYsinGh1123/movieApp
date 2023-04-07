import { async } from '@firebase/util';
import { addDoc,doc,getDocs,query,updateDoc ,where} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars'
import { reviewRef,db } from '../firebase/firebase';
import swal from 'sweetalert';
import { Appstate } from './App';
import { useNavigate } from 'react-router-dom';
const Reviews = ({id ,prevRating,prevRaters , setReviewAdd}) => {
  const useAppstate = useContext(Appstate);
  const navigate = useNavigate();
  const [form,setForm] = useState({
        rating:0,
        comment:'',
        movieid: id,
        time:'',
        person:useAppstate.user
  }
  );
  const [loading,setLoading] = useState(false);
  const [reviewloading,setReviewLoading] = useState(false);
  const [reviewList,setReviewList] = useState([]);
  const addReview = async ()=>{
            try{
              if(useAppstate.login){
              setLoading(true);
              const d = new Date().getTime();
              form.time = d;
              form.person = useAppstate.user;
              form.movieid = id;


              console.log('from date',form);
              await addDoc(reviewRef,form);
              // console.log(id,prevRating,prevRaters);
              swal({
                title: 'review Added',
                icon: 'success',
                buttons:false,
                timer:5000,
                
              });
              const ref = doc(db,"movies",id);
              // console.log('ref',ref);
              await updateDoc(ref,{
                rating: prevRating + form.rating,
                noOfRaters:prevRaters + 1,
              });
              setReviewAdd(d);
              setLoading(false);
              setForm({
                rating:0,
                comment:''
              });

            }else{
              swal({
                title: 'You need to login first',
                icon: 'error',
                buttons:false,
                timer:5000,

              });
              navigate('/login');
            }
             
              
            }
            catch(err){
              swal({
                buttons:false,
                title:{err},
                icon:'error',
              })
            }
          }

     useEffect(()=>{
        async function getData(){
          setReviewLoading(false);
          setReviewList([]);
          const que = query(reviewRef,where('movieid','==',id));
          const querySnapshot = await getDocs(que);

          querySnapshot.forEach((doc)=>{
            console.log('data',doc.data().time);
            setReviewList((prev)=>[...prev,doc.data()]);
          })
          setReviewLoading(false);
        }
        getData();
     },[loading,])     

  return (
    <div className='mt-4'>
        <div className='flex items-center'>
            <span className='p-1 text-lg text-'>Give stars :</span>
            
                <ReactStars
                value={form.rating}
                half ={true}
                size={25}
                edit ={true}
                onChange={(e)=>setForm({...form,rating:e})}
            />    
        </div>
        <input
         value={form.comment}
         placeholder=' write a review'
         className='w-full p-2 outline-none font-semibold text-xl header'
         onChange={(e)=>setForm({...form,comment : e.target.value})}
        />
        <button className='w-full text-white bg-purple-700 border-0 py-4 px-8 focus:outline-none hover:bg-purple-900 rounded text-lg mt-2' onClick={addReview}>
         {loading ?<div className='flex justify-center'><TailSpin height={40} color='white'/></div>:'Share'}
        </button>
         {reviewloading? <div className='mt-6 flex justify-center'><ThreeDots color='white' height={15}/></div>:
          
          <div className='mt-4'>

            { 
              reviewList.map((e,i) => {
                  return (
                  <div className='w-full ml-2 p-2 border-b border-gray-600 mt-2' key={i}>

                    <div className='flex items-center'>
                      <p className='text-blue-500'>{e.person}</p>
                      <p className='text-xs ml-3'>{new Date(e.time).toLocaleString()}</p>
                    </div>

                    <div className=''>
                      <ReactStars
                        value={e.rating}
                        size={15}
                        edit={false}
                      />

                      <p className='w-full text-lg'>
                        {e.comment}
                      </p>

                    </div>
                       

                  </div>      
                  )
                })
            }
          </div>
         }
      </div>
  )
}

export default Reviews