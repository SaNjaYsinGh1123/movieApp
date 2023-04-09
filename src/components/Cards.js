import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import { movieRef } from '../firebase/firebase';
const Cards = () => {
  const [data,setData] = useState([]);
   const [loading,setLoading] = useState(true);
  useEffect(()=>{
     async function getData(){
    
        const dataFromfirebase = await getDocs(movieRef);
        console.log(dataFromfirebase);
        dataFromfirebase.forEach((doc)=>{
            setData((previous)=> [...previous,{...(doc.data()),id: doc.id}]);
        });
       setLoading(false);
    
     }
     getData();
  },[]);
  return (
    <div className='flex flex-wrap justify-around md:justify-between px-1 mt-0'>
       {loading ? <div className='w-full h-96 flex items-center justify-center'><ThreeDots color='white' height={40}/></div>:
        
          data.map((e,i)=>{
            return (
              <div key={i} className='font-medium shadow-lg p-2 poster-color hover:-translate-y-4 cursor-pointer mt-6 transition-all duration-500'>
                  <Link to={`/detail/${e.id}`}>
                    <img className='h-96 w-80 md:h-72 md:w-44' src={e.image} alt='movie-image' onError={(e)=>e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019'}/>
                  <div className='ml-2 mt-1'>
                    <h1>{(e.title).split(':')[0]}</h1>
                    <h1 className='flex items-center'>
                      <span className='hidden md:block'> Rating:</span>
                    <ReactStars
                      count={5}
                      value={e.rating/e.noOfRaters}
                      size={24}
                      color2={'#ffd700'}
                      edit = {false}
                      />
                    </h1>
                    <h1>Year: {e.year}</h1>
                  </div>
                  </Link>
                </div>
               )
            })
        }
       
    </div>
  )
}

export default Cards