import React, { Component } from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import './Auth.css';
import AuthContext from '../context/auth-context';

class AuthPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.buttons = [{
      buttonModel: {
          content: 'DISMISS',
          cssClass: 'e-primary',
          isPrimary: true,
      },
      'click': () => {
          this.dialogInstance.hide();
      }
  }];
    this.validation = (args) => {
      if (this.emailEl.value === "" && this.passwordEl.value === "") {
          args.cancel = true;
          alert("Enter the E-mail and password");
      }
      else if (this.emailEl.value === "") {
          args.cancel = true;
          alert("Enter the email");
      }
      else if (this.passwordEl.value === "") {
          args.cancel = true;
          alert("Enter the password");
      }
      else if (this.passwordEl.value.length < 4) {
          args.cancel = true;
          alert("Password must be minimum 4 characters");
      }
      else {
          args.cancel = false;
          this.userName.value = "";
          this.password.value = "";
      }
  };

  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  onSubmit() {
    this.dialogInstance.show();
}
  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    let requestBody = {
      query: `query {login(email:"${email}", password:"${password}") {userId token tokenExpiration}}`,
      // variables: {
      //   email: email,
      //   password: password
      // }
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `mutation {createUser(userInput:{email:"${email}",password:"${password}"}) {_id email}}`,
        // variables: {
        //   email: email,
        //   password: password
        // }
      };
    }
    console.log("xhvjhgc", requestBody)
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        if (resData.data.createUser) {

          
          console.log("signup Successfull");
        }
        else {

        }
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

 

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={this.onSubmit = this.onSubmit.bind(this)}>
            Switch to {this.state.isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
        <DialogComponent id='dialog' header='Success' buttons={this.buttons} beforeOpen={this.validation} content='Congratulations! Login Success' width='250px' isModal={true} ref={dialog => this.dialogInstance = dialog} visible={false} target='#dialog-target'/>
      </form>
    );
  }
}

export default AuthPage;