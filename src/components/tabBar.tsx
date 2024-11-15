/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useNavigate } from 'react-router-dom';

//@ts-ignore
export const TabBar = () => {
//   const [showProfile, setShowProfile] = useState(false);
  const { setShowDynamicUserProfile, showDynamicUserProfile } = useDynamicContext();
  const navigate = useNavigate();

  return (
    <div className='flex flex-row justify-evenly gap-1'>
        <button onClick={() => navigate("/dashboard")}>Home</button>
        <button onClick={() => navigate("/bucket")}>Bucket</button>
        <button onClick={() => navigate("/upload")}>Upload</button>
        <button onClick={() => setShowDynamicUserProfile(!showDynamicUserProfile)}>Profile</button>
    </div>
  );
};