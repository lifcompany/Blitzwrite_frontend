import React from 'react';
import ServerErrorImage from '../../assets/error/server-error.svg';

const ServerError = () => {
  return (
    <div className='h-full w-full min-h-0 justify-center overflow-hidden flex flex-1'>
      <div className='flex flex-col lg:flex-row-reverse items-center py-15 px-5 rounded-md  justify-center pt-30'>
        <div className='relative flex'>
          <img src={ServerErrorImage} alt='' />
        </div>
        <div className='relative flex flex-col items-center'>
          <span className='break-words text-[4rem] font-semibold mb-[1.8rem]'>Oops!</span>
          <span className=' break-words text-4xl font-semibold mb-[1.8rem]'>Internal server error</span>
          <a className='ant-btn ant-btn-link' href='/'>
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
