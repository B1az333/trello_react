import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { fetchRegister } from '../redux/login/actions';

function RegisterForm() {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirm: '',
        },
    });

    const onSubmit = (register) => {
        if (register.password !== register.confirm) {
            alert("Password and password confirmation don't match! Please try again");
            return;
        }

        dispatch(fetchRegister(register.username, register.email, register.password));
    };

    return (
        <div className="form__container">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="loginform">
                <h2 className="loginform__title">Registration Form</h2>
                <label htmlFor="username" className="loginform__label">
                    login {errors?.username && <span>{errors?.username?.message}</span>}
                </label>
                <input
                    {...register("username", {required: "(This field must not be empty)"})}
                    type="text"
                    autoFocus
                    className="loginform__input"
                />

                <label htmlFor="email" className="loginform__label">
                    email {errors?.email && <span>{errors?.email?.message}</span>}
                </label>
                <input
                    {...register("email", {
                        required: "(This field must not be empty)",
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Email not valid"
                        }
                    })}
                    type="email"
                    required
                    className="loginform__input"
                />

                <label htmlFor="password" className="loginform__label">
                    password {errors?.password && <span>{errors?.password?.message}</span>}
                </label>
                <input
                    {...register("password", {required: "(This field must not be empty)"})}
                    type="password"
                    required
                    className="loginform__input"
                    autoComplete="on"
                />

                <label htmlFor="confirm" className="loginform__label">
                    confirm password <br></br>{errors?.confirm &&  <span>{errors?.confirm?.message}</span>}
                </label>
                <input
                    {...register("confirm", {required: "(This field must not be empty)"})}
                    type="password"
                    required
                    className="loginform__input"
                    autoComplete="on"
                />
                <span className="loginform__buttonwrapper">
                    <input type="submit" className="button loginform__submit" value="Register" />
                </span>
                <p className="loginform__choising">
                    Already have an account?{`\t`}
                    <Link to={'/login'}>
                        <input
                            type="button"
                            className="button loginform__button"
                            value="Log in" />
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterForm;
