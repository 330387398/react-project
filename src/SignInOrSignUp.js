import React, {Component} from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

export default class SignInOrSignUp extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selected: 'signIn'
        }
    }
    switch (e) {
        this.setState({
            selected: e.target.value
        })
    }
    render () {
        return (
            <div className="signInOrSignUp">
                <nav>
                    <div>
                        <input type="radio" value="signIn" checked={this.state.selected === 'signIn'} onChange={this.switch.bind(this)} onClick={this.props.onShowSignIn} />
                        <span id="signIn">登录</span>
                    </div>
                    <div>
                        <input type="radio" value="signUp" checked={this.state.selected === 'signUp'} onChange={this.switch.bind(this)} onClick={this.props.onShowSignUp} />
                        <span id="signUp">注册</span>
                    </div>
                    <i id="slide"></i>
                </nav>
                <div className="panes">
                    {this.state.selected === 'signIn' ? <SignInForm formData={this.props.formData} onChange={this.props.onChange} onSubmit={this.props.onSignIn} onForgotPassword={this.props.onForgotPassword} /> : null}
                    {this.state.selected === 'signUp' ? <SignUpForm formData={this.props.formData} onSubmit={this.props.onSignUp} onChange={this.props.onChange} /> : null}
                </div>
            </div>
        )
    }
}
