import React from 'react';

import { UserRequests } from '../services';
import UserStorage from '../utils/UserStorage.js';

let user = {
    userToken: null,
    userName: null,
};

function LoginForm({
    onSubmitLogin,
    onClickToRegistration,
}) {
    const [login, setLogin] = React.useState(() => {
        return {
            identifier: '',
            password: '',
        };
    });

    function changeInputLoginForm(event) {
        event.persist();
        setLogin((prev) => {
            return { ...prev, [event.target.name]: event.target.value };
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await UserRequests.login(login.identifier, login.password).then((res) => {
                user.userToken = res.jwt;
                user.userName = res.user.username;
            });
        } catch (error) {
            console.log('No such user!');
        }

        if (!user.userToken) {
            alert('Invalid login or password');
            return;
        }

        UserStorage.setUser(user.userToken, user.userName);
        onSubmitLogin();
    }

    return (
        <div className="form__container">
            <form onSubmit={handleSubmit} autoComplete="off" className="loginform">
                <h2 className="loginform__title">Login Form</h2>
                <label htmlFor="identifier" className="loginform__label">
                    login
                </label>

                <input
                    name="identifier"
                    id="identifier"
                    type="text"
                    value={login.identifier}
                    onChange={changeInputLoginForm}
                    required
                    className="loginform__input"
                />
                <label htmlFor="password" className="loginform__label">
                    password
                </label>

                <input
                    name="password"
                    id="password"
                    type="password"
                    value={login.password}
                    onChange={changeInputLoginForm}
                    required
                    className="loginform__input"
                    autoComplete="on"
                />
                <span className="loginform__buttonwrapper">
                    <button type="submit" className="button loginform__submit">
                        Login
                    </button>
                </span>

                <p className="loginform__choising">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        onClick={() => {
                            onClickToRegistration();
                        }}
                        className="button loginform__button">
                        Start here
                    </button>{' '}
                </p>
            </form>
        </div>
    );
}

export default LoginForm;