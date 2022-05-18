import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchLogin } from '../redux/loginActions';

function LoginForm({ onClickToRegistration }) {
    const dispatch = useDispatch();

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

    function handleSubmit(event) {
        event.preventDefault();

        dispatch(fetchLogin(login.identifier, login.password));
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