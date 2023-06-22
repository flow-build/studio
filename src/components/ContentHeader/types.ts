import { ModeView } from 'shared/enum';
import { BreadcrumbsProps } from 'stories/components/Breadcrumb/types';

export type ContentHeaderProps = {
  items: BreadcrumbsProps['items'];
  initialModeView?: ModeView;
  onChangeModeView?: (modeView: ModeView) => void;
};
