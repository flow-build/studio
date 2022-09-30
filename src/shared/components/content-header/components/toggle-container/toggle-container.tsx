import { useCallback, useState } from "react";

import { ModeView } from "constants/mode-view";

import { TButtonModeView } from "./types/TButtonModeView";
import { TPayload } from "shared/components/content-header/types/TPayload";

import * as S from "./styles";

export const ToggleContainer: React.FC<TButtonModeView> = ({
  initialModeView = ModeView.LIST,
  onChangeModeView = () => {},
  showToggle = true,
}) => {
  const [payload, setPayload] = useState<TPayload>({
    modeview: initialModeView,
  });

  const onChangeToggle = useCallback(
    (_, newModeView: ModeView) => {
      setPayload((prev) => ({ ...prev, modeview: newModeView }));
      onChangeModeView(newModeView);
    },
    [onChangeModeView]
  );

  return (
    <>
      {showToggle && (
        <S.ToggleContainer value={payload.modeview} onChange={onChangeToggle}>
          <S.Toggle value={ModeView.LIST} aria-label="Show in list mode">
            <S.ListIcon />
          </S.Toggle>

          <S.Toggle value={ModeView.CARDS} aria-label="Show in card mode">
            <S.ModuleIcon />
          </S.Toggle>
        </S.ToggleContainer>
      )}
      ;
    </>
  );
};
