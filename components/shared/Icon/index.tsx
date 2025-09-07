import { AddIcon, LogoIcon, SaleIcon, SearchIcon, StockIcon } from '@/components/icons';

export const ICON_MAP = {
  add: AddIcon,
  logo: LogoIcon,
  sale: SaleIcon,
  search: SearchIcon,
  stock: StockIcon,
};

interface IconProps {
  type: keyof typeof ICON_MAP;
}

export const Icon = ({ type }: IconProps) => {
  const IconComponent = ICON_MAP[type as keyof typeof ICON_MAP];
  if (!IconComponent) return null;
  return <IconComponent />;
};
