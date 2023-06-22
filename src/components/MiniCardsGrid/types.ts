import { MiniCardsProps } from 'stories/components/MiniCardsCarousel/components/MiniCards/types';

export type MiniCardsGridItem = Omit<MiniCardsProps, 'urlImg' | 'urlRedirect'> & {
  id: string;
};

export type MiniCardsGridProps = {
  items: MiniCardsGridItem[];
  totalPage: number;
  onChangePage?: (page: number) => void;
};
