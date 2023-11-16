"use client";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  name: string;
  label: string;
};

export default function FormFileUpload({ name, label }: Props) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<String[]>([]);
  const { setValue, getValues, control } = useFormContext();
  const validateImage = (image: File, i = 0) => {
    if (!image) return false;
    if (!["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
      setErrors([`${image.name} is not a valid image type`]);
      return false;
    } else if (image.size > 3000000) {
      setErrors([`${image.name} is larger than 3MB`]);
      return false;
    }
    return true;
  };

  useEffect(() => {
    get(getValues(), name) && setPreviews(get(getValues(), name));
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file1 = event.target.files![0];
    const file2 = event.target.files![1];
    const validFiles: string[] = [];
    if (!file1 && !file2) return;
    setErrors([]);
    if (file1 && file2) {
      const files = [file1, file2];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const validFile = validateImage(file, i);
        if (validFile) {
          validFiles.push(URL.createObjectURL(file));
        }
      }
      if (!errors.length) {
        setPreviews(validFiles);
        setValue(name, validFiles, { shouldValidate: true });
      }
    } else {
      const file = file1 || file2;
      const validFile = validateImage(file);
      if (validFile) {
        validFiles.push(URL.createObjectURL(file));
      }
      if (!errors.length) {
        setPreviews(validFiles);
        setValue(name, validFiles, { shouldValidate: true });
      }
    }
  };
  return (
    <div className="w-full md:w-6/12 my-2">
      <Label className="my-2" htmlFor="picture">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <>
            <Input
              {...field}
              type="file"
              value={""}
              //multiple
              id="fileInput"
              onChange={async (event) => {
                await handleFileChange(event);
              }}
              style={{ display: "none" }}
            />
            <label htmlFor="fileInput" className="flex flex-row space-x-2 my-2">
              {previews.length ? (
                previews.map((e) => (
                  <img
                    key={e}
                    src={e}
                    alt="Preview"
                    className="max-h-[100px] max-w-[100px]"
                  />
                ))
              ) : (
                <div className="flex items-center text-sm border-dashed border-[1px] rounded-md border-gray-400 bg-field w-full h-9 pl-1 lg:w-[300px]">
                  Upload
                </div>
              )}
            </label>
            <div className="w-full lg:w-[300px] text-sm">
              {fieldState.error && (
                <>
                  <span className="text-destructive self-start">
                    {fieldState.error.message}
                  </span>
                  <br />
                </>
              )}
              {errors.length > 0 && (
                <span className=" text-destructive self-start">
                  {errors[0]}
                </span>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
}
