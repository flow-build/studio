import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';
import { useFormik } from 'formik';
import _delay from 'lodash/delay';
import _isEqual from 'lodash/isEqual';
import { useRouter } from 'next/navigation';
import { createToken } from 'services/flowbuildServer/createToken';
import { localApi } from 'services/localServer';
import { messages } from 'shared/enum';
import { CognitoSignIn } from 'shared/types/cognito';
import { showSnackbar } from 'store/slices/snackbar';
import { setBasicInfosUser, setTempEmail } from 'store/slices/user';
import * as yup from 'yup';

export const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const INITIAL_VALUES = {
    username: '',
    password: ''
  };

  const validationSchemaLogin = yup.object().shape({
    username: yup.string().required(messages.fieldRequired).email(messages.invalidEmail),
    password: yup.string().required(messages.fieldRequired)
  });

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: validationSchemaLogin,
    validateOnBlur: true,
    onSubmit: onSubmit
  });

  async function onSubmit(values: typeof INITIAL_VALUES) {
    try {
      const cognitoResponse = await localApi.post<CognitoSignIn>('/api/signIn', values);
      const hasAttributes = cognitoResponse.data?.attributes;

      const tokenResponse = await createToken(cognitoResponse.data?.username);

      const token = tokenResponse.data.jwtToken;
      setCookie('token', token);

      if (hasAttributes) {
        const { attributes } = cognitoResponse.data;

        dispatch(
          setBasicInfosUser({
            email: attributes.email,
            name: attributes.name,
            sub: attributes.sub
          })
        );

        router.push('/');
        return;
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError?.message) {
        if (_isEqual(axiosError.message, 'UserNotConfirmedException')) {
          dispatch(setTempEmail(values.username));
          _delay(() => router.push('/verify-email'), 500);
        } else {
          dispatch(showSnackbar({ severity: 'error', message: (error as Error).message }));
        }
      }
    }
  }

  return { formik };
};
