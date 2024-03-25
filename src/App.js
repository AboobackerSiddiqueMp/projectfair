import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Auth></Auth>}></Route>

        <Route path="/register" element={<Auth register={"register"}></Auth>}></Route>

        <Route path="/dashboard" element={<Dashboard  ></Dashboard>}></Route>
        <Route path="/project" element={<Project></Project>}></Route>


      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
