import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { fetchLogin } from '../redux/login/actions';

function LoginForm() {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const onSubmit = (data) => {
        dispatch(fetchLogin(data.identifier, data.password));
    };

    return (
        <div className="form__container">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="loginform">
                <h2 className="loginform__title">Login Form</h2>
                <label htmlFor="identifier" className="loginform__label"> 
                    login {errors?.identifier && <span>{errors?.identifier?.message}</span>} 
                </label> 
                <input {...register("identifier", {required: "(This field must not be empty)"})} className="loginform__input" id="identifier" type="text" />

                <label htmlFor="password" className="loginform__label"> 
                    password {errors?.password && <span>{errors?.password?.message}</span>}
                </label>
                <input {...register("password", {required: "(This field must not be empty)"})} className="loginform__input" id="password" type="password" autoComplete="on" />

                <span className="loginform__buttonwrapper">
                    <input type="submit" className="button loginform__submit" value="Login" />
                </span>

                <p className="loginform__choising">
                    Don't have an account?{`\t`}
                    <Link to={'/registration'}>
                        <input type="button" className="button loginform__button" value="Start here" />
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;