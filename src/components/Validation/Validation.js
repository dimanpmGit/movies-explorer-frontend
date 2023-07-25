import { useState, useEffect } from 'react';

import { EMAIL_REGXPT_PATTERN } from '../../utils/constants';

export const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(false);
  const [minLengthError, setMinLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isInputValid, setInputValid] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          if (value) {
            setEmpty(false);
          }
          else {
            setEmpty(true);
            setErrorText('Поле не может быть пустым');
          }
          break;
        case 'minLength':
          if ((value.length > 0) && (value.length < validations[validation])) {
            setMinLengthError(true);
            setErrorText('Слишком короткое значение');
          }
          else {
            setMinLengthError(false);
          };
          break;
        case 'isEmail':
          const re = EMAIL_REGXPT_PATTERN;
          if ((value.length > 0) && !re.test(String(value).toLowerCase())) { 
            setEmailError(true);
            setErrorText('Некорректный email');
          } else {
            setEmailError(false);
          }
          break;
        default:
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    (isEmpty || minLengthError || emailError ) ? setInputValid(false) : setInputValid(true);
  }, [isEmpty, minLengthError, emailError]);
  return {
    isEmpty,
    minLengthError,
    emailError,
    isInputValid,
    loginError,
    errorText
  }
};

export const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(() => initialValue);
  const [isDirty, setDirty] = useState(false);
  
  const valid = useValidation(value, validations);

  const onChangeInitial = (initialValue) => {
    setValue(initialValue);
  }

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const onBlur = (e) => {
    setDirty(true);
  }
  return {
    value,
    onChangeInitial,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
};