import React, { Component } from 'react';
import './UserDialog.css';
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'

export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedTab: 'signInOrSignUp',
            formData: {
                email: '',
                username: '',
                password: ''
            }
        }
    }
    signUp(e){
        e.preventDefault()
        let {email, username, password} = this.state.formData
        let success = (user)=>{
            this.props.onSignUp.call(null, user)
        }
        let error = (error)=>{
            switch(error.code){
                case 202: alert('用户名已被占用')
                break
                default: alert(error)
                break
            }
        }
        signUp(email, username, password, success, error)
    }
    signIn(e){
        e.preventDefault()
        let {username, password} = this.state.formData
        let success = (user)=>{
            this.props.onSignIn.call(null, user)
        }
        let error = (error)=>{
            switch(error.code){
                case 210: alert('用户名与密码不匹配')
                break
                default: alert(error)
                break
            }
        }
        signIn(username, password, success, error)
    }
    changeFormData(key, e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))   // JSON 深拷贝
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    showSignIn(){
        document.getElementById('slide').style.left = 0
        document.getElementById('signIn').style.color = 'white'
        document.getElementById('signUp').style.color = 'rgb(98,94,91)'
    }
    showSignUp(){
        document.getElementById('slide').style.left = '100px'
        document.getElementById('signIn').style.color = 'rgb(98,94,91)'
        document.getElementById('signUp').style.color = 'white'
    }
    render(){
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ? 
                    <SignInOrSignUp formData={this.state.formData} onSignIn={this.signIn.bind(this)} onSignUp={this.signUp.bind(this)} onChange={this.changeFormData.bind(this)} onForgotPassword={this.showForgotPassword.bind(this)} onShowSignIn={this.showSignIn.bind(this)} onShowSignUp={this.showSignUp.bind(this)} /> :
                    <ForgotPasswordForm formData={this.state.formData} onSubmit={this.resetPassword.bind(this)} onChange={this.changeFormData.bind(this)} onSignIn={this.returnToSignIn.bind(this)}/>}
                </div>
            </div>
        )
    }
    showForgotPassword() {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    returnToSignIn() {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    resetPassword(e) {
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
    }
}
