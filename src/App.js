import { Route, Routes } from 'react-router';
import './App.css';
import Login from './Login';
import Layout from './Layout';
import RequireAuth from './RequireAuth';
import Home from './Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Layout/>}>
        <Route path='login' element={<Login />} />
        <Route element={RequireAuth} >
          <Route path='/home' element={<Home/> } />
        </Route>
      </Route>
   </Routes>
  );
}

export default App;
