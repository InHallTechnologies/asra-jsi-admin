import logo from './logo.svg';
import './App.css';
import { useContext, useEffect } from 'react';
import context, { Provider } from './context/app-context';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/home-page.component';
import { ref, set } from 'firebase/database';
import { firebaseAuth, firebasedatabase } from './backend/firebase-handler';
import AuthPage from './pages/AuthPage/auth-page.component';

function App() {

  // useEffect(() => {
  //     firebaseAuth.signOut()
  // }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<AuthPage />} />
        <Route path="/" element={<Navigate to={'/dashboard'} replace />} />
        <Route path="/:selectedTab" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default () => {
  return(
    <Provider>
      <ChakraProvider>
        <App/>
      </ChakraProvider>
    </Provider>
  )
}
