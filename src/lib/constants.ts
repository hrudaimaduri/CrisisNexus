export const ALERT_PRIORITIES = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

export const ALERT_STATUSES = {
  ACTIVE: 'active',
  RESOLVED: 'resolved',
  MONITORING: 'monitoring',
} as const;

export const NAVIGATION_ITEMS = [
  {
    href: '/',
    label: 'Home',
    icon: 'Home',
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: 'Compass',
  },
  {
    href: '/alerts',
    label: 'Alerts',
    icon: 'AlertTriangle',
  },
  {
    href: '/locations',
    label: 'Locations',
    icon: 'MapPin',
  },
  {
    href: '/history',
    label: 'Alert History',
    icon: 'Clock',
  },
] as const;

export const PRIORITY_COLORS = {
  [ALERT_PRIORITIES.HIGH]: {
    text: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-600',
  },
  [ALERT_PRIORITIES.MEDIUM]: {
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: 'text-amber-500',
  },
  [ALERT_PRIORITIES.LOW]: {
    text: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-500',
  },
} as const;