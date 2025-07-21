import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const handleGoBackHomeButton = () =>{
    navigate('/')
  }


  return (
    <div className="login-container">
      <h1>Login to your account</h1>
      <form className="login-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="login-btn">Login</button>
        <button type="submit" className="login-btn" onClick={handleGoBackHomeButton}>Go back to home </button>
      </form>
    </div>
  );
}
