import { ModeView } from 'constants/mode-view';

export type TButtonModeView = {
    initialModeView?: ModeView;
    onChangeModeView?: (newModelView: ModeView) => void;
    showToggle?: boolean;
};