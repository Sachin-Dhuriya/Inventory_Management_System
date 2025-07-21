import './Signup.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();

    const handleAlreadyHaveAccountButton = () =>{
      navigate('/Login')
    }


  return (
    <div className="signup-container">
      <h1>Create a new account</h1>
      <form className="signup-form">
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="signup-btn">Sign Up</button>
        <button type='submit' className='signup-btn' onClick={handleAlreadyHaveAccountButton}>Already have an account</button>
      </form>
    </div>
  );
}
