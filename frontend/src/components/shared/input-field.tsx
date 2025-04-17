import type { Control, FieldValues, Path } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
} & React.ComponentProps<'input'>

export const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: Props<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-2">
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input {...props} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
