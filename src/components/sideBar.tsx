/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useNavigate } from 'react-router-dom';

//@ts-ignore
export const SideBar = () => {
//   const [showProfile, setShowProfile] = useState(false);
  const { setShowDynamicUserProfile, showDynamicUserProfile } = useDynamicContext();
  const navigate = useNavigate();

  return (
    <div style={{display: 'flex', flexDirection: 'column', padding: '20px'}}>
        <button style={{marginBottom: '20px'}} onClick={() => navigate("/dashboard")}>Home</button>
        <button style={{marginBottom: '20px'}} onClick={() => navigate("/bucket")}>Bucket</button>
        <button style={{marginBottom: '20px'}} onClick={() => navigate("/upload")}>Upload</button>
        <button onClick={() => setShowDynamicUserProfile(!showDynamicUserProfile)}>Profile</button>
    </div>
  );
};