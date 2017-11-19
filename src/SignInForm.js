import React from 'react';

export default function (props) {
    return (
        <form className="signIn" onSubmit={props.onSubmit}>
            <div className="row">
                <label>昵称</label>
                <input type="text" placeholder="试用昵称：XiaoMing" value={props.formData.username} onChange={props.onChange.bind(null, 'username')}/>
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password" placeholder="试用密码：123456" value={props.formData.password} onChange={props.onChange.bind(null, 'password')}/>
            </div>
            <div className="row"><a href="#" onClick={props.onForgotPassword}>忘记密码？</a></div>
            <div className="row actions"><button type="submit">登录</button></div>
        </form>
    )
}
