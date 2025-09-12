import {
  AppleIcon,
  BananaIcon,
  CarrotIcon,
  CherryIcon,
  CitrusIcon,
  ConfigsIcon,
  EditIcon,
  EggIcon,
  GoalIcon,
  GrapeIcon,
  LeafyIcon,
  LogoIcon,
  NotFarmIcon,
  NotificationBellIcon,
  NotificationIcon,
  ProductIcon,
  SaleIcon,
  SproutIcon,
  StockIcon,
  TrashIcon,
  VeganIcon,
} from '@/components/icons';
import { SvgProps } from 'react-native-svg';

export const ICON_MAP = {
  apple: AppleIcon,
  banana: BananaIcon,
  carrot: CarrotIcon,
  cherry: CherryIcon,
  citrus: CitrusIcon,
  configs: ConfigsIcon,
  edit: EditIcon,
  egg: EggIcon,
  goal: GoalIcon,
  grape: GrapeIcon,
  leafy: LeafyIcon,
  logo: LogoIcon,
  notFarm: NotFarmIcon,
  notificationBell: NotificationBellIcon,
  notification: NotificationIcon,
  product: ProductIcon,
  sale: SaleIcon,
  sprout: SproutIcon,
  stock: StockIcon,
  trash: TrashIcon,
  vegan: VeganIcon,
};

interface IconProps extends SvgProps {
  type: keyof typeof ICON_MAP;
}

export const Icon = ({ type, color, ...props }: IconProps) => {
  const IconComponent = ICON_MAP[type];
  if (!IconComponent) return null;

  return <IconComponent color={color as string} {...props} />;
};
