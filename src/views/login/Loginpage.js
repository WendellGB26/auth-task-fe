import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Login from '../../components/login/login';

function Loginpage() {
  const user = useSelector(state => state.user); 
  const [userLength, setUserLength] = useState();

  useEffect(() => {
    if (user) {
      setUserLength(user.length);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center">
      { userLength === 0  ? <Login/> : null }
    </div>
  );
}

export default Loginpage;
