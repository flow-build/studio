import { useState } from "react";

import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";

import { IPayloadDashboardForm } from "pages/settings/types/IPayloadDashboardForm";

import * as S from "./styles";

type Props = {
  onSubmit: (payload: IPayloadDashboardForm) => void;
  isLoading: boolean;
  defaultMetabaseUrl?: string;
  defaultSecretKey?: string;
  defaultDashboardNumber?: string;
  labelmetabaseSiteUrl: string;
  labelmetabaseSecretKey: string;
  labeldashboardNumber: string;
};

export const DashboardForm: React.FC<Props> = ({
  onSubmit,
  isLoading,
  defaultMetabaseUrl,
  defaultSecretKey,
  defaultDashboardNumber,
  labelmetabaseSiteUrl,
  labelmetabaseSecretKey,
  labeldashboardNumber,
}) => {
  const [payload, setPayload] = useState<IPayloadDashboardForm>({
    metabaseSiteUrl: defaultMetabaseUrl || "",
    metabaseSecretKey: defaultSecretKey || "",
    dashboardNumber: defaultDashboardNumber || "",
  });

  function isFormFilled() {
    return (
      !_isEmpty(payload.metabaseSiteUrl) &&
      !_isEmpty(payload.metabaseSecretKey) &&
      !_isEmpty(payload.dashboardNumber)
    );
  }

  function isDefaultMetabaseValue() {
    return (
      _isEqual(payload.metabaseSiteUrl, defaultMetabaseUrl) &&
      _isEqual(payload.metabaseSecretKey, defaultSecretKey) &&
      _isEqual(payload.dashboardNumber, defaultDashboardNumber)
    );
  }

  function onChangePayload(value: string, field: keyof IPayloadDashboardForm) {
    setPayload((state) => ({ ...state, [field]: value }));
  }

  const isSubmitMetabaseEnabled = isFormFilled() && !isDefaultMetabaseValue();

  return (
    <S.Wrapper>
      <S.Input
        small
        label={labelmetabaseSiteUrl}
        value={payload.metabaseSiteUrl}
        onChange={(event) =>
          onChangePayload(event.target.value, "metabaseSiteUrl")
        }
      />

      <S.Input
        small
        label={labelmetabaseSecretKey}
        value={payload.metabaseSecretKey}
        onChange={(event) =>
          onChangePayload(event.target.value, "metabaseSecretKey")
        }
      />

      <S.Input
        small
        label={labeldashboardNumber}
        value={payload.dashboardNumber}
        onChange={(event) =>
          onChangePayload(event.target.value, "dashboardNumber")
        }
      />
      <S.SubmitButton
        disabled={!isSubmitMetabaseEnabled}
        onClick={() => onSubmit(payload)}
      >
        {isLoading && <S.Loading />}

        {!isLoading && <S.TextSubmitButton>Enviar</S.TextSubmitButton>}
      </S.SubmitButton>
    </S.Wrapper>
  );
};

