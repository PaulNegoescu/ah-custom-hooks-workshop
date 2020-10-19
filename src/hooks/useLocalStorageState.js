import { useState } from 'react';

export default function useLocalStorageState(key, initialValue) {
    const [value, setValue] = useState(() =>
        JSON.parse(window.localStorage.getItem(key))
    );

    function updateValue(newVal) {
        if (newVal !== undefined && newVal !== null) {
            window.localStorage.setItem(key, JSON.stringify(newVal));
        } else {
            window.localStorage.removeItem(key);
        }
        setValue(newVal);
    }

    return [value, updateValue];
}
