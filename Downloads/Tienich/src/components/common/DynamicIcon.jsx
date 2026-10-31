import * as Icons from 'lucide-react';

export function DynamicIcon({ name, size = 20, className = '', color }) {
  const IconComponent = Icons[name] || Icons.Wrench || Icons.HelpCircle;
  return <IconComponent size={size} className={className} color={color} />;
}
