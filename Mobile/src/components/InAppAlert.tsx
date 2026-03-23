import React from 'react';
import { Pressable, View } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CheckCircle2, CircleAlert, CircleX, X } from 'lucide-react-native';

type AlertType = 'success' | 'error' | 'warning';

interface InAppAlertProps {
  visible: boolean;
  type?: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
}

const alertStyles: Record<
  AlertType,
  {
    container: string;
    icon: any;
    iconClass: string;
    titleClass: string;
  }
> = {
  success: {
    container: 'border-primary/20 bg-primary/10',
    icon: CheckCircle2,
    iconClass: 'text-primary',
    titleClass: 'text-foreground',
  },
  error: {
    container: 'border-destructive/20 bg-destructive/10',
    icon: CircleX,
    iconClass: 'text-destructive',
    titleClass: 'text-foreground',
  },
  warning: {
    container: 'border-muted-foreground/20 bg-muted',
    icon: CircleAlert,
    iconClass: 'text-muted-foreground',
    titleClass: 'text-foreground',
  },
};

export function InAppAlert({
  visible,
  type = 'warning',
  title,
  message,
  onClose,
}: InAppAlertProps) {
  if (!visible) return null;

  const style = alertStyles[type];

  return (
    <View className={`mb-4 rounded-xl border px-4 py-3 ${style.container}`}>
      <View className="flex-row items-start gap-3">
        <Icon as={style.icon} size={18} className={style.iconClass} />
        <View className="flex-1">
          {title ? <Text className={`text-sm font-bold ${style.titleClass}`}>{title}</Text> : null}
          <Text className="mt-0.5 text-sm text-muted-foreground">{message}</Text>
        </View>
        {onClose ? (
          <Pressable onPress={onClose} className="rounded-md p-1">
            <Icon as={X} size={16} className="text-muted-foreground" />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

