"use client"
import { getCookie } from '@/app/fwucontext/CustomCookies';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader } from 'lucide-react';
import React from 'react'

function Profile() {
  const {data,isError,isLoading} = useQuery({
    queryKey: ['profile'],
    queryFn:async () =>{
         const response=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile`,{
             headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${getCookie("token")}`,
              },
         });
         const data=await response.data;
         return data;
    }
  });

  if(isLoading){
    return (<div className=' flex justify-center items-center w-full h-screen'>
        <h1 className='text-black flex justify-center items-center gap-2 text-3xl'> <Loader className='animate-spin'/> Loading...</h1>
    </div>)
  }
  if(isError){
    return (<div className='flex justify-center items-center w-full h-screen'>
        <h1 className='text-red-500 text-3xl flex justify-center items-center gap-2'> <Loader className='animate-spin'/> Error</h1>
    </div>)
  }

  return (
    <div>
        <h1>
           
        </h1>
    </div>
  )
}

export default Profile