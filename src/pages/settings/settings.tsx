import * as S from "./styles";

import { FormMqtt } from "pages/settings/components/formMqtt";
import { FormServer } from "pages/settings/components/formServer";

export const Settings: React.FC<{}> = () => {
  return (
    <S.Container>
      <S.Title>Configurações</S.Title>
      <FormServer />
      <FormMqtt />
    </S.Container>
  );
};
