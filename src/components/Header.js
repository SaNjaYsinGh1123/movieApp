import React,{useContext} from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate} from './App';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Header = () => {
  const useAppstate = useContext(Appstate);
  return (
    <div className='sticky top-0 z-10 text-3xl flex justify-between text-red-500 font-bold p-5 md:p-3 border-b-2 border-gray-500  header-color '>
       <Link to='/'><div className='text-2xl md:text-3xl'>
          movie<span className='text-white'>world</span>
        </div></Link>
     {useAppstate.login?
        <Link to='/addmovie'>
          <h1 className='text-2xl text-white flex items-center cursor-pointer'>
            <Button  color='inherit'>
              <AddIcon className='mr-2'/>Add New
            </Button> 
          </h1>
        </Link>
        :<Link to='/login'>
        <h1 className='text-2xl text-white flex items-center cursor-pointer'>
          <Button  color='inherit'>
            <AccountCircleIcon className='mr-1' color='secondary'/>Login
          </Button> 
        </h1>
      </Link>

    }
    </div>
  )
}

export default Header