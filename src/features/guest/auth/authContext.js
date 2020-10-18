import React, { useCallback } from 'react';
import useLocalStorageState from '../../../hooks/useLocalStorageState';

const initialState = {
    token: null,
    userEmail: null,
};

const AuthContext = React.createContext(initialState);

function AuthContextProvider({ children }) {
    const [value, setValue] = useLocalStorageState('auth', initialState);

    const setAuthValues = useCallback(
        (token, email) => {
            setValue({
                token,
                userEmail: email,
            });
        },
        [setValue]
    );

    const logout = useCallback(() => {
        setValue(initialState);
    }, [setValue]);

    return (
        <AuthContext.Provider value={{ ...value, setAuthValues, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider };
