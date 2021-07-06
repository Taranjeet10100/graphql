import React, { Component, useState } from "react";
import Header from '../../newcomponents/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
const Auth = () => {
    const [toggle, setToggle] = useState(false);
    const handleLogin=async(event)=>{
        event.preventDefault()
        const { email, password } = await event.target.elements;
        let loginData = {query: `query {login(email:"${email.value}", password:"${password.value}") {userId token tokenExpiration}}`};
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: new Headers({
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }),
        })
        .then(res => {
            console.log(res)
            //return res.json();
        })
    }
    const handleSignUp=async(event)=>{
        event.preventDefault()
        const { newEmail, newPassword } = event.target.elements;
        let requestBody = {
            query: `mutation {createUser(userInput:{email:"${newEmail.value}",password:"${newPassword.value}"}) {_id email}}`,
            // variables: {
            //   email: email,
            //   password: password
            // }
          };
        // let signData = {query: `mutation {createUser(userInput:{email:"${newEmail.value}",password:"${newPassword.value}"}) {_id email}}`};
        // console.log(signData)
        console.log(requestBody)
        await fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: new Headers({
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }),
        })
        .then(res => {
            console.log('sign up')
            console.log("yjhfgjv : " + JSON.stringify(res))
            if(res.status !== 200 && res.status !== 201) 
            {
                //throw new Error('Failed!');
                toast('Failed !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else{
                toast('Your Account Created Successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            //return res.json();
        })
        .catch(error => {
            console.log('dddd'+error)
        });
    }
    return (
        <>
            <Header />
            <div className='container-fluid'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-md-6 col-12'>
                            <img src={'assets/images/i3.jpg'} style={{ width: '100%' }} />
                        </div>
                        <div className='col-md-6 col-12'>
                            <div className="login-page" style={{width:'100%'}}>
                                <div className="form" style={{ paddingTop: '10px' }}>
                                    <h1 style={{ marginBottom: '25px' }}>{toggle ? 'Register' : 'Login'}</h1>
                                    <form className="register-form" style={{ display: toggle ? 'block' : 'none' }} onSubmit={handleSignUp}>
                                        <input type="email" placeholder="Username" name='newEmail' required/>
                                        <input type="password" placeholder="Password" name='newPassword' required/>
                                        <button>Register</button>
                                        <p className="message">Already registered? <a onClick={() => setToggle(toggle ? false : true)} style={{ cursor: 'pointer', color: '#4CAF50' }}>Sign In</a></p>
                                    </form>
                                    <form className="login-form" style={{ display: toggle ? 'none' : 'block' }} onSubmit={handleLogin}>
                                        <input type="email" placeholder="Username" name='email' required/>
                                        <input type="password" placeholder="Password" name='password' required/>
                                        <button>Login</button>
                                        <p className="message">Not registered? <a onClick={() => setToggle(toggle ? false : true)} style={{ cursor: 'pointer', color: '#4CAF50' }}>Create an account</a></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Auth;