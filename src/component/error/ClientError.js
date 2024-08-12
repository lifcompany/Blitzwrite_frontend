import React from 'react';
import { Link } from 'react-router-dom';
import ClientErrorImage from '../../assets/images/error/client-error.svg';

const ClientError = () => {
  return (
    <div className='h-full w-full min-h-0 justify-center overflow-hidden flex flex-1'>
      <div className='flex flex-col lg:flex-row-reverse items-center py-15 px-5 rounded-md  justify-center pt-30'>
        <div className='relative flex'>
          <img src={ClientErrorImage} alt=''/>
        </div>
        <div className='relative flex flex-col items-center'>
          <span className='break-words text-[4rem] font-semibold mb-[1.8rem] text-black'>Oops!</span>
          <span className=' break-words text-4xl font-semibold mb-[1.8rem] text-black'>申し訳ありませんが、ページが見つかりません!</span>
          <Link className='ant-btn ant-btn-link text-black' to='/'>
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientError;
