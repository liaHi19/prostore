import { useState } from "react";

import { Info } from "lucide-react";
import { Control, useWatch } from "react-hook-form";
import { z } from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { signUpFormSchema } from "@/lib/validators";

import EyeButton from "./shared/EyeButton";

const rules = [
  {
    id: "len",
    label: "At least 6 characters",
    test: (v: string) => v.length >= 6,
  },
  {
    id: "upper",
    label: "One uppercase letter",
    test: (v: string) => /[A-Z]/.test(v),
  },
  {
    id: "lower",
    label: "One lowercase letter",
    test: (v: string) => /[a-z]/.test(v),
  },
  { id: "num", label: "One number", test: (v: string) => /\d/.test(v) },
  {
    id: "sym",
    label: "One special character (!@#$…)",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
];

const RuleList = ({ value }: { value: string }) => {
  return (
    <ul className="space-y-1.5">
      {rules.map((rule) => {
        const pass = value.length > 0 && rule.test(value);
        return (
          <li key={rule.id} className="flex items-center gap-2 text-sm">
            <span
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                pass
                  ? "border-green-600 bg-green-600 dark:bg-[#00b935] dark:border-[#00b935]"
                  : "border-muted-foreground"
              )}
            >
              {pass && (
                <svg viewBox="0 0 10 10" className="size-2" fill="none">
                  <polyline
                    points="2,5 4.5,7.5 8,3"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span
              className={cn(
                "transition-colors",
                pass
                  ? "text-green-700 dark:text-[#00b935]"
                  : "text-muted-foreground"
              )}
            >
              {rule.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export const PasswordField = ({
  control,
  name,
}: {
  control: Control<z.infer<typeof signUpFormSchema>>;
  name: "password";
}) => {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const value = useWatch({ control, name }) ?? "";

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1.5">
            Password
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Info className="size-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent side="right" className="w-56 p-3">
                <p className="mb-2 text-xs font-medium text-muted-foreground capitalize tracking-wide">
                  Requirements
                </p>
                <RuleList value={value} />
              </PopoverContent>
            </Popover>
          </FormLabel>

          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={show ? "text" : "password"}
                placeholder="Enter password"
                autoComplete="new-password"
                className="pr-9"
                onFocus={() => setFocused(true)}
                onBlur={() => {
                  setFocused(false);
                  field.onBlur();
                }}
              />
              <EyeButton show={show} setShow={setShow} />
            </div>
          </FormControl>

          {focused && value.length > 0 && (
            <div className="rounded-lg border bg-popover p-3 shadow-md">
              <p className="mb-2 text-xs font-medium text-muted-foreground capitalize tracking-wide">
                Password strength
              </p>
              <RuleList value={value} />
            </div>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
