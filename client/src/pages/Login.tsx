import '../styles/loginPage.css'
import { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../api/authAPI.js'
import Auth from '../utils/auth.js';
import { UserLogin } from '../interfaces/UserLogin';

const Login = () => {
    
    const [loginData, setLoginData] = useState<UserLogin>({
        username: '',
        password: ''
      });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
          // Call the login API endpoint with loginData
          const data = await login(loginData);
          // If login is successful, call Auth.login to store the token in localStorage
          Auth.login(data.token);
        } catch (err) {
          console.error('Failed to login', err);  // Log any errors that occur during login
        }
      };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={loginData.username || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={loginData.password || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-footer">
                    <p>Don't have an account? <Link to='/signup' className='signup-link'>Sign up</Link></p>
                    <button className='loginBtn' type="submit">Log in</button>
                </div>
            </form>
        </div>
    );
};

export default Login;