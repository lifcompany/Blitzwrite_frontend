import React from 'react';
import { Link } from 'react-router-dom';
import ClientErrorImage from '../../assets/error/client-error.svg';

const ClientError = () => {
  return (
    <div className='h-screen w-full min-h-0 p-2 justify-center overflow-hidden flex'>
      <div className='flex flex-col lg:flex-row-reverse items-center py-15 px-5 rounded-md  justify-center pt-30'>
        <div className='relative flex'>
          <img src={ClientErrorImage} alt=''/>
        </div>
        <div className='relative flex flex-col items-center'>
          <span className='break-words text-[4rem] font-semibold mb-[1.8rem] text-black'>Oops!</span>
          <span className=' break-words text-4xl font-semibold mb-[1.8rem] text-black'>Sorry, page not found!</span>
          <Link className='ant-btn ant-btn-link text-black' to='/'>
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientError;
