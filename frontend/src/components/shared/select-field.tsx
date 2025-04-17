import type { Control, FieldValues, Path } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type SelectOption = { label: string; value: string }

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  options: SelectOption[]
}

export const SelectField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
}: Props<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-2">
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger id={name} className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
)
