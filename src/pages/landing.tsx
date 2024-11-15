/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from 'react';
import { useDynamicContext, DynamicWidget } from '@dynamic-labs/sdk-react-core'
import { useNavigate } from 'react-router-dom';

//@ts-ignore
export const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useDynamicContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
        navigate("/dashboard")
    } else {
        localStorage.removeItem('hederaAccountData');
    }
  }, [user])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log(isMobile)

//   if(isMobile) {
//     return (
//         <div style={{position: 'relative', display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw'}}>
//         <div>
//           {children}
//         </div>
//         <div style={{position: 'absolute', bottom: 0, width: '100%', padding: '1rem', backgroundColor: '#bad3ff'}}>
//             Bottoms Tab
//         </div>
//         </div>
//       );
//   }

  return (
    <div style={{display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw'}}>
        <DynamicWidget />
    </div>
  );
};