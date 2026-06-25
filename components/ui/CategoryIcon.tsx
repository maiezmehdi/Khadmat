import {
  Wrench, Zap, Sparkles, Paintbrush, Leaf, Wind, Truck, Laptop,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  plomberie:    Wrench,
  electricite:  Zap,
  menage:       Sparkles,
  peinture:     Paintbrush,
  jardinage:    Leaf,
  climatisation: Wind,
  demenagement: Truck,
  informatique: Laptop,
};

interface CategoryIconProps {
  slug: string;
  size?: number;
  color?: string;
  className?: string;
}

export function CategoryIcon({ slug, size = 24, color, className }: CategoryIconProps) {
  const Icon = iconMap[slug] ?? Wrench;
  return <Icon size={size} color={color} className={className} strokeWidth={1.8} />;
}
