"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
} from "@/components/ui/field"
import TextInputField, { TextAreaField } from "./_reuseable-form-components/text-input-field"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
})

type FormData = z.infer<typeof formSchema>

export function SubCategoryForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  function onSubmit(data: FormData) {
    console.log(data)
    toast.success("Form submitted successfully!")
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent className="pt-6">
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <TextInputField
              form={form}
              name="name"
              label="Sub Category Name"
              placeholder="e.g Phones"
            />
            <TextAreaField
              form={form}
              name="description"
              label="Description"
              placeholder="Enter description"
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}