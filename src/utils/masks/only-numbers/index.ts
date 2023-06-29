import { MaskFunction } from 'utils/masks/types';

export const maskOnlyNumbers: MaskFunction = (value: string): string => {
  if (value === '') {
    return value;
  }

  return value.replace(/\D/g, '');
};
