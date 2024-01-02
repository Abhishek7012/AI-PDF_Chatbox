import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'
import './LoginForm.css';

const LoginForm = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate("/")
    }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = async () => {

    let result = await fetch("http://localhost:5000/login", {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    result = await result.json();
    // console.log('resultlogin', result);
    if (result.email) {
      localStorage.setItem('user', JSON.stringify(result.name));
      localStorage.setItem('email', JSON.stringify(result.email));
      localStorage.setItem('userid', JSON.stringify(result._id));

      navigate("/")
    } else {
      alert("Please enter correct details")
    }
  }

  return (
    <>
      <div className="login-box">
        <div className="card custom-card">
          <div className="card-body">
            <h1 className="login-header">Log In</h1>
            <div className="input-box">
              <input
                type="text"
                className="input-field"
                placeholder="Email or phone number"
                onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className="input-box">
              <input
                type="password"
                className="input-field"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div className='input-submit'>
              <button className="submit-btn" onClick={handleLogin}>
                Sign In
              </button>
            </div>
            <div className="sign-up-link">
              <span>New to Chat-Box ?</span>
              <span ><Link to="/signup">Sign up now</Link></span>
            </div>
          </div>

        </div>
      </div>
      <div className='test-link'>
        <h2>For Test</h2>
        <h3>Email Id    = test@test.com</h3>
        <h3>Password = test1234</h3>
      </div>
    </>
  );


}



export default LoginForm;