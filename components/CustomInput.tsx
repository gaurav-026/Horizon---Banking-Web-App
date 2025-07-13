import React from "react";
import { FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import z from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  //"email" | "password" --> to provide more accuracy hum aise kr sakte h but If we need to add more fields then we've to add it in authFormSchema, and here as well. Pretty repeating right so react-hook-form provide us FieldPath feature that tracks which fields are added newly!,
  label: string;
  type: string;
  placeholder: string;
}

const CustomInput = ({
  control,
  name,
  label,
  type,
  placeholder,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label text-14">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <label>
              <Input
                placeholder={placeholder}
                type={type}
                className="input-class text-16"
                suppressHydrationWarning={true}
                {...field}
                
              />
            </label>
            <FormMessage className="form-message text-12 !mt-2"></FormMessage>
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
