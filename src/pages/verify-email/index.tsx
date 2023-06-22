import { FormEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Logo } from 'components';
import { cryptoConfig } from 'config/crypto';
import cryptoJs from 'crypto-js';
import _isEqual from 'lodash/isEqual';
import { useRouter } from 'next/router';
import { localApi } from 'services/localServer';
import { project } from 'shared/enum';
import { RootState, store } from 'store';
import { reset, setNewPassword } from 'store/slices/user';
import { Loading } from 'stories/components';
import { Button } from 'stories/components/Forms/Button';
import { OTPInput } from 'stories/components/Forms/OTPInput';
import * as S from 'styles/verifyEmailPageStyles';
import { Logger } from 'utils';

const TOKEN_LENGTH = 6;

export default function VerifyEmail() {
  const router = useRouter();
  const dispatch = useDispatch();

  const newPassword = useRef(decryptPassword(store.getState().user.newPassword));
  const tempEmail = useSelector((state: RootState) => state.user.tempEmail);
  const resettingPassword = useSelector((state: RootState) => state.user.resettingPassword);
  const email = useRef(tempEmail);

  const [token, setToken] = useState('');
  const disableButton = !_isEqual(token.length, TOKEN_LENGTH);

  function decryptPassword(hash?: string) {
    if (!hash) {
      return undefined;
    }

    const passwordBytes = cryptoJs.AES.decrypt(hash, cryptoConfig.secretKey as string);
    return passwordBytes.toString(cryptoJs.enc.Utf8);
  }

  async function handleResetPasswordSubmit() {
    await localApi.post('/api/forgotPassword/submit', {
      username: email.current,
      newPassword: newPassword.current,
      code: token
    });

    router.replace('/login');
  }

  async function handleSignUpSubmit(): Promise<void> {
    try {
      const result = await localApi.post('/api/verifyEmail', { email: email.current, code: token });

      if (_isEqual(result.status, 200)) {
        router.replace('/login');
      }
    } catch (error) {
      if (error instanceof Error) {
        if (_isEqual(error.message, 'CodeMismatchException')) {
          Logger.error('Código inválido');
        }
      }
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (resettingPassword) {
      await handleResetPasswordSubmit();
      return;
    }

    await handleSignUpSubmit();
  }

  async function resendCode() {
    if (resettingPassword) {
      await localApi.post('/api/forgotPassword/sendCode', { email: email.current });
      return;
    }

    await localApi.post('/api/resendCode', { email: email.current });
  }

  useEffect(() => {
    dispatch(setNewPassword());

    return () => {
      console.log('aqui');
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!email.current) {
      router.replace('/login');
    }
  }, [router]);

  if (!email.current) {
    return <Loading />;
  }

  return (
    <S.Main>
      <S.Wrapper>
        <S.SideLeft>
          <Logo urlImg={project.urlImgLogo} />
        </S.SideLeft>

        <S.Form onSubmit={onSubmit}>
          <h3>Validação de e-mail</h3>
          <p>
            Insira o token enviado para <strong>{email.current}</strong>
          </p>

          <OTPInput autoFocus length={TOKEN_LENGTH} onChangeToken={setToken} />

          <Button type="submit" variant="outlined" disabled={disableButton}>
            Enviar
          </Button>

          <Button type="button" variant="text" onClick={resendCode}>
            Reenviar código
          </Button>
        </S.Form>
      </S.Wrapper>
    </S.Main>
  );
}
