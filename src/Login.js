import React from 'react'
import { useState, useEffect, useRef } from 'react'
import useAuth from './hooks/useAuth'
import axios from './api/axios'
import Home from './Home'
import wave from './img/wave.png'
import { useLocation, useNavigate } from 'react-router'
import { replace } from 'dom/lib/mutation'

const LOGIN_URL = '/auth/login'

function Login() {
    const { setAuth } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: user, password: pwd }), {
                headers: { 'Content-Type': 'application/json' },
            })
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            const accessToken = response?.data?.token
            // const roles = response?.data?.roles
            // console.log(roles);
            setAuth({ user, pwd, accessToken })
            setUser('')
            setPwd('')
            navigate(from, { replace: true })
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorised')
            } else (
                setErrMsg('Login failed')
            )
            errRef.current.focus()
        }
    }

    return (
        <body>
            < div className='container'>
                <div className='img'>
                    <img src={wave} />
                </div>
                <div class="login-content">
                    {/* <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p> */}
                    <form onSubmit={handleSubmit}>
                        <h2>Log In</h2>
                        <p>Login with your data that you entered during your registration</p>
                        <div class="input-div one">
                            <div class="div">
                                <input
                                    type='text'
                                    id='username'
                                    placeholder='Enter Email'
                                    ref={userRef}
                                    autoComplete='off'
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                />
                            </div>
                        </div>
                        <div class="input-div pass">
                            <div class="div">
                                <input
                                    type='password'
                                    id='password'
                                    placeholder='Password'
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                />
                            </div>
                        </div>
                        <a href='#'>Forgot Password?</a>
                        <input type="submit" class="btn" value="Login" />
                    </form>
                </div>
            </div >
        </body>
    )
}

export default Login
