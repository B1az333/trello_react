import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchLogin } from '../redux/loginActions';

function LoginForm() {
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
                    Don't have an account?{`\t`}
                    <Link to={'/registration'}>
                        <button
                            type="button"
                            className="button loginform__button">
                            Start here
                        </button>
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;