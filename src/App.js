import React from "react";
import { useSelector } from 'react-redux';
import './styles/style.css';

import { LoginForm, RegisterForm, TaskBoard } from './components';

function App() {
    const isLoginedBefore = useSelector(({ loginReducer }) => loginReducer.isLogined);
    const [isRegister, setIsRegister] = React.useState(true);
    const [isLogin, setIsLogin] = React.useState(isLoginedBefore);

    React.useEffect(() => {
        if(isLoginedBefore){
            setIsLogin(true);
            setIsRegister(true);
        }
	}, [isLoginedBefore]); // eslint-disable-line
    
    function handleToggleRegLogin(logined = false) {
        if (!isRegister || logined) {
            setIsRegister(true);
            setIsLogin(false);
        } else {
            setIsRegister(false);
            setIsLogin(true);
        }
    }

    return (
        <>
            {!isRegister && (
                <RegisterForm
                    onClickToLogin={handleToggleRegLogin}
                />
            )}

            {!isLogin && (
                <LoginForm
                    onClickToRegistration={handleToggleRegLogin}
                />
            )}

            {isLogin && isRegister && <TaskBoard onClickToLogout={handleToggleRegLogin} />}
        </>
    );
}

export { App };
