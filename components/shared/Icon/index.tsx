import { GoalIcon, LogoIcon, NotFarmIcon, ProductIcon, SaleIcon, StockIcon } from '@/components/icons';

export const ICON_MAP = {
  goal: GoalIcon,
  logo: LogoIcon,
  notFarm: NotFarmIcon,
  product: ProductIcon,
  sale: SaleIcon,
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
