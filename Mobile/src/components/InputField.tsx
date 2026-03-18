import { Text, TextInput, View, type TextInputProps } from 'react-native';

type InputFieldProps = TextInputProps & {
  label: string;
  containerClassName?: string;
};

export default function InputField({
  label,
  containerClassName,
  className,
  ...props
}: InputFieldProps) {
  return (
    <View className={`gap-2 ${containerClassName ?? ''}`}>
      <Text className="text-sm font-semibold text-foreground">{label}</Text>
      <TextInput
        className={`rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground ${className ?? ''}`}
        placeholderTextColor="#94a3b8"
        {...props}
      />
    </View>
  );
}
