import React from 'react';

const LoginForm = (props) => {
    return (
        <form
            onSubmit={props.handleLogin}
            >
            <div>
                username
                <input
                    id='username'
                    type="text"
                    value={props.username}
                    name="Username"
                    onChange={({ target }) => props.setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    id='password'
                    type="password"
                    value={props.password}
                    name="Password"
                    onChange={({ target }) => props.setPassword(target.value)}
                />
            </div>
            <button
                id='login-button'
                type="submit"
            >login
            </button>
        </form>
    );
}

export default LoginForm;