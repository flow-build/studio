import { FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TextFieldProps } from '@mui/material';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';
import { flowbuildApi } from 'services/flowbuildServer';
import { createToken } from 'services/flowbuildServer/createToken';
import { LOCAL_STORAGE_KEYS } from 'shared/localStorage';
import { showSnackbar } from 'store/slices/snackbar';

import * as S from './styles';

export const FlowbuildServer: FC = () => {
  const dispatch = useDispatch();

  const urlRef = useRef<TextFieldProps>(null);
  const portRef = useRef<TextFieldProps>(null);

  const [errors, setErrors] = useState({ url: false, port: false });

  async function healthCheck(url: string) {
    return await axios.get(`${url}/healthcheck`);
  }

  function saveServerOnLocalStorage(url: string, port: string) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FLOWBUILD_SERVER, url);
    localStorage.setItem(LOCAL_STORAGE_KEYS.FLOWBUILD_PORT, port);
  }

  function getUserId() {
    const token = getCookie('token') as string;

    if (!token) {
      return '';
    }

    const decoded = jwtDecode(token) as { user_id: string };
    return decoded?.user_id;
  }

  async function onSetNewToken() {
    const userId = getUserId();
    const tokenResponse = await createToken(userId);
    const token = tokenResponse.data.jwtToken || tokenResponse.data.token;

    if (!token) {
      dispatch(showSnackbar({ message: 'Erro ao requisitar novo token', severity: 'error' }));
      return;
    }

    setCookie('token', token);
  }

  async function onSave() {
    const url = urlRef.current?.value as string;
    const port = portRef.current?.value as string;

    const isUrlEmpty = !url;
    const isPortEmpty = !port;

    setErrors({ url: isUrlEmpty, port: isPortEmpty });

    if (isUrlEmpty || isPortEmpty) {
      return;
    }

    try {
      await healthCheck(url);
      saveServerOnLocalStorage(url, port);
      flowbuildApi.setBaseUrl(url);

      await onSetNewToken();

      dispatch(showSnackbar({ message: 'Sucesso ao salvar as informações', severity: 'success' }));
    } catch (error) {
      dispatch(showSnackbar({ message: 'Erro ao validar URL', severity: 'error' }));
    }
  }

  return (
    <S.Wrapper>
      <S.Row>
        <S.Input
          label="URL do servidor do flowbuild"
          error={errors.url}
          helperText={errors.url ? 'Campo obrigatório' : ' '}
          inputRef={urlRef}
        />
        <S.Input
          label="Porta do servidor"
          small
          error={errors.port}
          helperText={errors.port ? 'Campo obrigatório' : ' '}
          inputRef={portRef}
        />
      </S.Row>

      <S.SubmitButton variant="contained" onClick={onSave}>
        Salvar
      </S.SubmitButton>
    </S.Wrapper>
  );
};
