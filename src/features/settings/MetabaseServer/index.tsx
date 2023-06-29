import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import jwtEncode from 'jwt-encode';
import { metabaseApi } from 'services/metabaseServer';
import { messages } from 'shared/enum';
import { LOCAL_STORAGE_KEYS } from 'shared/localStorage';
import { showSnackbar } from 'store/slices/snackbar';
import { InputText } from 'stories/components';
import { getErrorsFormik, getHelperTextFormik } from 'utils';
import * as yup from 'yup';

import * as S from './styles';

export const MetabaseServer: FC = () => {
  const dispatch = useDispatch();
  const INITIAL_VALUES = getInitialValues();

  const validationSchema = yup.object().shape({
    url: yup.string().required(messages.fieldRequired),
    secretKey: yup.string().required(messages.fieldRequired),
    dashboardId: yup.string().required(messages.fieldRequired)
  });

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    onSubmit
  });

  function getInitialValues() {
    const url = localStorage.getItem(LOCAL_STORAGE_KEYS.METABASE_URL);
    const secretKey = localStorage.getItem(LOCAL_STORAGE_KEYS.METABASE_SECRET_KEY);
    const dashboardId = localStorage.getItem(LOCAL_STORAGE_KEYS.METABASE_DASHBOARD_ID);

    return {
      url: url ?? '',
      secretKey: secretKey ?? '',
      dashboardId: dashboardId ?? ''
    };
  }

  function onSubmit(values: typeof INITIAL_VALUES) {
    const payloadMetabaseUrl = {
      resource: { dashboard: Number(values.dashboardId) },
      params: {},
      exp: Math.round(Date.now() / 1000) + 10 * 60 // 10 minute expiration
    };

    const token = jwtEncode(payloadMetabaseUrl, values.secretKey);

    const baseDashboardUrl = `${values.url}/embed/dashboard/${token}`;
    const dashboardUrl = `${baseDashboardUrl}#theme=night&bordered=true&titled=true`;

    localStorage.setItem(LOCAL_STORAGE_KEYS.METABASE_DASHBOARD_REPORT_URL, dashboardUrl);

    metabaseApi.setBaseUrl(dashboardUrl);

    dispatch(
      showSnackbar({ message: 'Dados do metabase alterados com sucesso', severity: 'success' })
    );
  }

  return (
    <S.Wrapper onSubmit={formik.handleSubmit}>
      <S.InputsContainer>
        <InputText
          label="Metabase URL"
          placeholder="Metabase URL"
          name="url"
          value={formik.values.url}
          onChange={formik.handleChange}
          helperText={getHelperTextFormik(formik, 'url')}
          error={getErrorsFormik(formik, 'url')}
        />

        <InputText
          label="Secret Key"
          placeholder="Secret Key"
          name="secretKey"
          value={formik.values.secretKey}
          onChange={formik.handleChange}
          helperText={getHelperTextFormik(formik, 'secretKey')}
          error={getErrorsFormik(formik, 'secretKey')}
        />

        <InputText
          label="Dashboard ID"
          placeholder="Dashboard ID"
          name="dashboardId"
          value={formik.values.dashboardId}
          onChange={formik.handleChange}
          helperText={getHelperTextFormik(formik, 'dashboardId')}
          error={getErrorsFormik(formik, 'dashboardId')}
        />
      </S.InputsContainer>

      <S.SubmitButton variant="contained" type="submit">
        Salvar
      </S.SubmitButton>
    </S.Wrapper>
  );
};
