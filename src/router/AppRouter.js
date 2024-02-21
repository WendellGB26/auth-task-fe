import { Route, Link, Router, useLocation, Redirect } from 'wouter';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './AppRouter.css';

import Home from '../views/home/Home';
import Loginpage from '../views/login/Loginpage';
import Logout from '../components/login/logout';

function AppRouter() {
  const user = useSelector(state => state.user); 
  const [userLength, setUserLength] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado para controlar si el usuario ha iniciado sesión

  const handleMenu = () => {
     setMenuOpen(!menuOpen);
  };
 
  useEffect(() => {
    if (user) {
      setUserLength(user.length);
    }

    const handleScroll = () => {
      if (window.scrollY !== 0) {
        setMenuOpen(false)
      }
    };

    window.addEventListener('scroll', handleScroll);

     const checkSize = () => {
       setIsMobile(window.innerWidth <= 768);
     };
 
     window.addEventListener('resize', checkSize);
 
     checkSize();
 
     return () => {
       window.removeEventListener('resize', checkSize);
     };
  }, [user]);

  useEffect(() => {
    if (userLength && userLength > 0) {
      setIsLoggedIn(true); // Cambia el estado a verdadero cuando el usuario inicia sesión
    }
  }, [user]);

  return (
    <div className="background">
      <Router>
        {!isMobile && userLength !== 0 ? (
          <nav className="navbar flex flex-row justify-end background px-10 py-5">
            <div className='flex flex-row w-full justify-between items-center'>
              <Link className='text-2xl text-white text-center' to="/">Tasks</Link>   
              <Logout/>
            </div>
          </nav>          
        ) : (
          userLength !== 0 ? (
            <div className="navbar flex flex-row justify-between items-center background px-10 py-5">
              <button className='nav-icon w-6 h-6' onClick={handleMenu}>menu</button>
            </div>
          ) : null 
        )}
        {
          menuOpen && (
            <div className="flex menu-mobile pt-2 justify-end">
              <div className="mobile-container flex flex-col">
                <Link className='text-2xl text-white text-center' to="/">Tasks</Link>
                { userLength != 0 ? <Logout/> : null }
              </div>
            </div>
          )
        }
          
        <main className="App-header">
          <Route path="/" component={userLength !== 0 ? Home : Loginpage} />
          <Route path="/tasks">
            {userLength !== 0 ? <Home /> : <Redirect to="/" />} {/* Redirige a la página de inicio si el usuario no ha iniciado sesión */}
          </Route>
        </main>

        <footer className='App-footer px-10 py-5 mt-10 min-h-20'>
          <h3 className='text-white text-center'>Designed and Developed by Wendell Guillen Brenes</h3>
          <h3 className='text-white text-center'>Copyright © 2024 WGB</h3>
        </footer>

      </Router>
    </div>
  );
}

export default AppRouter;
