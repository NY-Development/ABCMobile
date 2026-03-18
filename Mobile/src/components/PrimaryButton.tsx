import { Pressable, Text, type PressableProps } from 'react-native';

type PrimaryButtonProps = PressableProps & {
  label: string;
  className?: string;
  textClassName?: string;
};

export default function PrimaryButton({
  label,
  className,
  textClassName,
  ...props
}: PrimaryButtonProps) {
  return (
    <Pressable
      className={`w-full items-center rounded-xl bg-primary px-4 py-4 active:opacity-85 ${className ?? ''}`}
      {...props}>
      <Text className={`text-base font-bold text-primary-foreground ${textClassName ?? ''}`}>
        {label}
      </Text>
    </Pressable>
  );
}
