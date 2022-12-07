import { useState } from "react";

import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";

import { IPayloadDashboardForm } from "pages/settings/types/IPayloadDashboardForm";

import * as S from "./styles";

type Props = {
  onSubmit: (payload: IPayloadDashboardForm) => void;
  isLoading: boolean;
  metabaseSiteUrl?: string;
  metabaseSecretKey?: string;
  dashboardNumber?: string;
  labelmetabaseSiteUrl: string;
  labelmetabaseSecretKey: string;
  labeldashboardNumber: string;
};

export const DashboardForm: React.FC<Props> = ({
  onSubmit,
  isLoading,
  labelmetabaseSiteUrl,
  labelmetabaseSecretKey,
  labeldashboardNumber,
}) => {
  const [payload, setPayload] = useState<IPayloadDashboardForm>({
    metabaseSiteUrl: "",
    metabaseSecretKey: "",
    dashboardNumber: "",
  });

  const isSubmitEnabled = isFormFilled();

  function isFormFilled() {
    return (
      !_isEmpty(payload.metabaseSiteUrl) &&
      !_isEmpty(payload.metabaseSecretKey) &&
      !_isEmpty(payload.dashboardNumber)
    );
  }

  function onChangePayload(value: string, field: keyof IPayloadDashboardForm) {
    setPayload((state) => ({ ...state, [field]: value }));
  }

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
        disabled={!isSubmitEnabled}
        onClick={() => onSubmit(payload)}
      >
        {isLoading && <S.Loading />}

        {!isLoading && <S.TextSubmitButton>Enviar</S.TextSubmitButton>}
      </S.SubmitButton>
    </S.Wrapper>
  );
};

