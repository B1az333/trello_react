import { useState } from "react";
import UserRequests from "../../services/UserRequests";
import UserStorage from "../../utils/UserStorage.js";

import "./style.css";

let user = {
  userToken: null,
  userName: null,
};

export function RegisterForm({
  onSubmitRegister,
  onClickToLogin,
  // onClickToBoard,
}) {
  const [register, setRegister] = useState(() => {
    return {
      username: "",
      email: "",
      password: "",
      confirm: "",
    };
  });

  function changeInputRegisterForm(event) {
    event.persist();
    setRegister((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (register.password !== register.confirm) {
      alert("Password and password confirmation don't match! Please try again");
      return;
    }

    try {
      await UserRequests.registration(
        register.username,
        register.email,
        register.password
      ).then((res) => {
        console.log(res);
        user.userToken = res.jwt;
        user.userName = res.user.username;
      });
    } catch (error) {
      console.log("Something went wrong. Try again");
    }

    UserStorage.setUser(user.userToken, user.userName);
    onSubmitRegister();
  }

  return (
    <div className="form__container">
      <form onSubmit={handleSubmit} autoComplete="off" className="loginform">
        <h2 className="loginform__title">Registration Form</h2>
        <label htmlFor="username" className="loginform__label">
          login
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={register.username}
          onChange={changeInputRegisterForm}
          autoFocus
          required
          className="loginform__input"
        />

        <label htmlFor="email" className="loginform__label">
          email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={register.email}
          onChange={changeInputRegisterForm}
          required
          className="loginform__input"
        />

        <label htmlFor="password" className="loginform__label">
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={register.password}
          onChange={changeInputRegisterForm}
          required
          className="loginform__input"
        />
        <label htmlFor="confirm" className="loginform__label">
          confirm password
        </label>
        <input
          type="password"
          id="confirm"
          name="confirm"
          value={register.confirm}
          onChange={changeInputRegisterForm}
          required
          className="loginform__input"
        />
        <span className="loginform__buttonwrapper">
          <button type="submit" className="button loginform__submit">
            Register
          </button>
        </span>
        <p className="loginform__choising">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClickToLogin();
            }}
            className="button loginform__button"
          >
            Log in
          </button>
        </p>
        {/* <p>
          Don't want register?{" "}
          <button
            type="button"
            onClick={() => {
              onClickToBoard();
            }}
          >
            Come in!
          </button>
        </p> */}
      </form>
    </div>
  );
}
