import { useRef, useState } from 'react';
import { validateInputFields } from '../utils/validation';

export default function useForm(initialValues, validationRules) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const alreadyValidated = useRef(false);

    function handleInputChange(e) {
        const { name, value, type } = e.target;
        const newVal =
            type === 'checkbox' || type === 'radio' ? !values[name] : value;
        const newValues = { ...values, [name]: newVal };

        if (alreadyValidated.current) {
            const { errors } = validateInputFields(newValues, validationRules);

            setErrors(errors);
        }
        setValues(newValues);
    }

    function validateValues() {
        const { hasErrors, errors } = validateInputFields(
            values,
            validationRules
        );

        if (hasErrors) {
            alreadyValidated.current = true;
            setErrors(errors);
        }
        return !hasErrors;
    }

    function bindInput(inputName, changedProp = 'value') {
        return {
            name: inputName,
            onChange: handleInputChange,
            [changedProp]: values[inputName],
        };
    }

    return [values, errors, bindInput, validateValues];
}
