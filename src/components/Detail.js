import { async } from '@firebase/util';
import { doc,getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {db, movieRef} from '../firebase/firebase'
import  ReactStars from 'react-stars'
import  {useParams} from 'react-router-dom';
import {ThreeDots} from 'react-loader-spinner'
import Reviews from './Reviews';
const Detail = () => {
  const [data,setData] = useState({});
  const {id} = useParams();
  const [loading,setLoading] = useState(true);
  const [review_added,setReviewAdd] = useState();
  useEffect(()=>{
    try{
      async function getData(){
         const _doc = doc(db,"movies",id);
         const _data = await getDoc(_doc);
         setData(_data.data());
         setLoading(false);
        }
        getData();
        console.log(data);
    }
    catch(err){
      console.log('error',err);
    }
    },[review_added]);

    return (
         <div>
          {loading ? <div className='h-96 w-full flex justify-center items-center'><ThreeDots color='white'/></div>:
             <div className='p-4 mt-4 w-full flex flex-col justify-center   md:flex-row md:items-start items-center'>
                <img alt='movie-img' src={data.image} className='h-96 mb-2 md:sticky md:top-24'/>
                <div className='w-full ml-0 md:ml-4 md:w-1/2 bg-black p-2 rounded-md'>
                  <h1 className='text-2xl font-bold text-gray-400'>{data.title} <span className='text-xl'>({data.year})</span></h1>
                  <ReactStars
                    size={25}
                    value={data.rating/data.noOfRaters}
                    half={true}
                    edit={false}
                  />
                  <p className='mt-3'>{data.description}</p>
                  <Reviews id={id} prevRating = {data.rating} prevRaters={data.noOfRaters} setReviewAdd = {setReviewAdd}/>
                </div>
                

             </div>
            }
        </div>
           )
  }
export default Detail