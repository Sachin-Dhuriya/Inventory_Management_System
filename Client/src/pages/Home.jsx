import './Home.css';
import{useNavigate} from 'react-router-dom';
import Navbar from '../component/navbar/Navbar';

export default function Home() {
  const navigate = useNavigate();
  const handleGetStarted = () =>{
    navigate('/Signup')
  }

  return (
    <div className="home-container">
      <Navbar/>
      <h1 className="bg-red-500 text-white p-10" >Welcome to the Inventory Management System</h1>
      <p>This is a trial Home page built with React + Vite ✨</p>
      <button className="primary-btn" onClick={handleGetStarted}>Get Started</button>
    </div>
  );
}
