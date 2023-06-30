import { FC } from 'react';

import Switch from '@mui/material/Switch';
import { getErrorsFormik, getHelperTextFormik } from 'utils';

import { useForm } from './hooks/useForm';
import * as S from './styles';

export const MqttServer: FC = () => {
  const { formik, isWss, onWssChange } = useForm();

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
