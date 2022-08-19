import * as S from "./styles";

import { FormServerMqtt } from "pages/settings/components/form-server-mqtt";
import { FormServerFlowbuild } from "pages/settings/components/form-server-flowbuild";
// import { ModalConfirmSettings } from "pages/settings/components/modal-confirm-settings";

export const Settings: React.FC<{}> = () => {
  return (
    <S.Container>
      <S.Title>Configurações</S.Title>
      <FormServerFlowbuild />
      <FormServerMqtt />
      {/* <ModalConfirmSettings /> */}
    </S.Container>
  );
};
