import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import Switch from '@mui/material/Switch';
import { cryptoConfig } from 'config/crypto';
import cryptoJs from 'crypto-js';
import { useFormik } from 'formik';
import { messages } from 'shared/enum';
import { usePahoMqtt } from 'shared/hooks/usePahoMqtt';
import { LOCAL_STORAGE_KEYS } from 'shared/localStorage';
import { showSnackbar } from 'store/slices/snackbar';
import { getErrorsFormik, getHelperTextFormik } from 'utils';
import * as yup from 'yup';

import * as S from './styles';

export const MqttServer: FC = () => {
  const INITIAL_VALUES = getInitialValues();

  const dispatch = useDispatch();
  const pahoMqtt = usePahoMqtt();
  const [isWss, setIsWss] = useState(!!INITIAL_VALUES.username && !!INITIAL_VALUES.password);

  const validationSchema = yup.object().shape({
    url: yup.string().required(messages.fieldRequired),
    port: yup.string().required(messages.fieldRequired),
    username: isWss ? yup.string().required(messages.fieldRequired) : yup.string(),
    password: isWss ? yup.string().required(messages.fieldRequired) : yup.string()
  });

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit
  });

  function getInitialValues() {
    const namespace = localStorage.getItem(LOCAL_STORAGE_KEYS.MQTT_NAMESPACE);
    const url = localStorage.getItem(LOCAL_STORAGE_KEYS.MQTT_SERVER);
    const port = localStorage.getItem(LOCAL_STORAGE_KEYS.MQTT_PORT);
    const username = localStorage.getItem(LOCAL_STORAGE_KEYS.MQTT_USERNAME);
    const hashedPassword = localStorage.getItem(LOCAL_STORAGE_KEYS.MQTT_PASSWORD) ?? '';

    const passwordBytes = cryptoJs.AES.decrypt(hashedPassword, cryptoConfig.secretKey ?? '');
    const password = passwordBytes.toString(cryptoJs.enc.Utf8);

    return {
      namespace: namespace ?? '',
      url: url ?? '',
      port: port ?? '',
      username: username ?? '',
      password: password ?? ''
    };
  }

  function onWssChange(_: unknown, checked: boolean) {
    setIsWss(checked);

    if (!checked) {
      formik.setFieldValue('password', '');
      formik.setFieldValue('username', '');
    }
  }

  async function onSubmit(values: typeof INITIAL_VALUES) {
    const { url, port, namespace, password, username } = values;
    const options = { password, username };

    const isMqttConfigValid = await pahoMqtt.validateConnection(url, Number(port), options);

    if (!isMqttConfigValid) {
      dispatch(showSnackbar({ message: 'Falha de conexão com o MQTT', severity: 'error' }));
      return;
    }

    localStorage.setItem(LOCAL_STORAGE_KEYS.MQTT_NAMESPACE, namespace);
    localStorage.setItem(LOCAL_STORAGE_KEYS.MQTT_SERVER, url);
    localStorage.setItem(LOCAL_STORAGE_KEYS.MQTT_PORT, port);

    let hashPassword = '';

    if (password) {
      hashPassword = cryptoJs.AES.encrypt(password, cryptoConfig.secretKey ?? '').toString();
    }

    localStorage.setItem(LOCAL_STORAGE_KEYS.MQTT_USERNAME, username);
    localStorage.setItem(LOCAL_STORAGE_KEYS.MQTT_PASSWORD, hashPassword);

    dispatch(showSnackbar({ message: 'Conexão com MQTT salva com sucesso', severity: 'success' }));
  }

  return (
    <S.Wrapper onSubmit={formik.handleSubmit}>
      <S.GridContainer>
        <S.NamespaceInput
          label="Namespace"
          placeholder="Namespace"
          name="namespace"
          value={formik.values.namespace}
          onChange={formik.handleChange}
        />

        <S.UrlInput
          label="URL do servidor"
          placeholder="URL do servidor"
          name="url"
          value={formik.values.url}
          onChange={formik.handleChange}
          helperText={getHelperTextFormik(formik, 'url')}
          error={getErrorsFormik(formik, 'url')}
        />
        <S.PortInput
          label="Porta"
          placeholder="Porta"
          name="port"
          mask="only-numbers"
          value={formik.values.port}
          onChange={formik.handleChange}
          helperText={getHelperTextFormik(formik, 'port')}
          error={getErrorsFormik(formik, 'port')}
        />

        <S.UsernameInput
          name="username"
          disabled={!isWss}
          label="Usuário"
          placeholder="Usuário"
          value={formik.values.username}
          onChange={formik.handleChange}
          helperText={isWss && getHelperTextFormik(formik, 'username')}
          error={isWss && getErrorsFormik(formik, 'username')}
        />

        <S.PasswordInput
          name="password"
          disabled={!isWss}
          label="Senha"
          placeholder="Senha"
          value={formik.values.password}
          onChange={formik.handleChange}
          helperText={isWss && getHelperTextFormik(formik, 'password')}
          error={isWss && getErrorsFormik(formik, 'password')}
        />

        <S.RadioButton checked={isWss} onChange={onWssChange} label="WSS" control={<Switch />} />
      </S.GridContainer>

      <S.SubmitButton variant="contained" type="submit">
        Salvar
      </S.SubmitButton>
    </S.Wrapper>
  );
};
