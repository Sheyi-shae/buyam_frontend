"use client"

import { Controller, UseFormReturn, Path, FieldValues } from "react-hook-form"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { CategoryType, LocationOptionProps } from "@/types/users"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { size } from "zod"

interface TextInputFieldProps<TFormData extends FieldValues> {
  form: UseFormReturn<TFormData>
  label: string
  name: Path<TFormData>
  placeholder: string
  type?: string
  options?: CategoryType[]
  loading?: boolean
}


interface StateSelectProps<TFormData extends FieldValues> {
  form: UseFormReturn<TFormData>
  label: string
  name: Path<TFormData>
  placeholder: string
  options?: LocationOptionProps[]
  loading?: boolean
}

export default function TextInputField<TFormData extends FieldValues>({
  form,
  label,
  name,
  placeholder,
  type = "text"
}: TextInputFieldProps<TFormData>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`form-${String(name)}`}>
            {label}
          </FieldLabel>
          <Input
            {...field}
            id={`form-${String(name)}`}
            type={type}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            //autoComplete="off"
          />
          {fieldState.invalid && fieldState.error?.message && (
            <FieldError>{fieldState.error.message}</FieldError>
          )}
        </Field>
      )}
    />
  )
}


export  function TextAreaField<TFormData extends FieldValues>({
  form,
  label,
  name,
  placeholder,
  //type = "text"
}: TextInputFieldProps<TFormData>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`form-${String(name)}`}>
            {label}
          </FieldLabel>
          <Textarea
            {...field}
            id={`form-${String(name)}`}
            
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            
          />
          {fieldState.invalid && fieldState.error?.message && (
            <FieldError>{fieldState.error.message}</FieldError>
          )}
        </Field>
      )}
    />
  )
}


export function SelectInput<TFormData extends FieldValues>({
  form,
  label,
  name,
  placeholder,
  options = [],
  loading
  //type = "text"
}: TextInputFieldProps<TFormData>
) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>

          <Select
            value={field.value ? String(field.value) : ""}
            onValueChange={(v) => field.onChange(v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {loading ? (
                <SelectItem value="loading" disabled>
                  Loading categories...
                </SelectItem>
              ) : (
                options?.map((opt) => (
                  <SelectItem key={String(opt.id)} value={String(opt.id)}>
                    {opt.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {fieldState.invalid && fieldState.error?.message && (
            <FieldError>{fieldState.error.message}</FieldError>
          )}
        </Field>
      )}
    />
  )
}




// state and city select

export function StateAndCitySelectInput<TFormData extends FieldValues>({
  form,
  label,
  name,
  placeholder,
  options = [],
  loading
  //type = "text"
}: StateSelectProps<TFormData>
) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>

          <Select
            value={field.value ? String(field.value) : ""}
            onValueChange={(v) => field.onChange(v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {loading ? (
                <SelectItem value="loading" disabled>
                  Loading categories...
                </SelectItem>
              ) : (
                options.map((opt) => (
                  <SelectItem key={opt.state} value={String(opt.state)}>
                    {opt.state}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {fieldState.invalid && fieldState.error?.message && (
            <FieldError>{fieldState.error.message}</FieldError>
          )}
        </Field>
      )}
    />
  )
}



// reuseable button component
interface ButtonProps{
  title: string;
  className?: string;
  loading?: boolean;
  size?: "sm" | "default" | "lg";

  


}
export  function PrimaryButton({title,className,size}:ButtonProps) {
  return (
    <Button size={size} className={`bg-emerald-600  ${className}`}>{ title}</Button>
  )
}

export  function SecondaryButton({title,className,size}:ButtonProps) {
  return (
    <Button size={size} className={`bg-amber-500  ${className}`}>{ title}</Button>
  )
}

export  function LoadingButton({title,className,size}:ButtonProps) {
  return (
    <div className="flex gap-2">
      <Button size={size} className={`bg-emerald-600  ${className}`} disabled><Spinner />{title}</Button>
    </div>
  )
}