import {
  ConfigsIcon,
  GoalIcon,
  LogoIcon,
  NotFarmIcon,
  NotificationBellIcon,
  NotificationIcon,
  ProductIcon,
  SaleIcon,
  StockIcon,
  VeganIcon,
} from '@/components/icons';

export const ICON_MAP = {
  configs: ConfigsIcon,
  goal: GoalIcon,
  logo: LogoIcon,
  notFarm: NotFarmIcon,
  notificationBell: NotificationBellIcon,
  notification: NotificationIcon,
  product: ProductIcon,
  sale: SaleIcon,
  stock: StockIcon,
  vegan: VeganIcon,
};

interface IconProps {
  type: keyof typeof ICON_MAP;
}

export const Icon = ({ type }: IconProps) => {
  const IconComponent = ICON_MAP[type as keyof typeof ICON_MAP];
  if (!IconComponent) return null;
  return <IconComponent />;
};
