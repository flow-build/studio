export type TabItem = {
  title: string;
  element: React.ElementType;
};

export type TabsProps = {
  items: TabItem[];
};
