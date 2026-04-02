import './App.css'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header, Login, SignUp } from './components';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);


  return !loading ? (
    <div className='min-h-screen flex flex-wrap bg-gray-400 content-between'>
      <div className="w-full block">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<div className="p-4">Home</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}



export default App
