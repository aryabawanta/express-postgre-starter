import difference from "lodash/difference";

export const validators: any = {
  required: (value: any, errorMessage?: string) =>
    !!value || errorMessage || "Value is required",
  enum: (value: string | number, options: any[] = [], errorMessage?: string) =>
    options.includes(value) ||
    errorMessage ||
    `Value must be one of [${options.join(", ")}]`,
  email: (value: string, errorMessage?: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || errorMessage || "Invalid email format";
  },
  array: (
    values: string[] | number[],
    options: any[] = [],
    errorMessage?: string
  ) =>
    (difference(values, options) || []).length > 0 ||
    errorMessage ||
    `Value must be one of [${options.join(", ")}]`,
};

export interface FieldValidator {
  key: string;
  value: any;
  validators: string[];
  options?: string[] | number[]; // only for enum validators
}

export function validateFields(fields: FieldValidator[]) {
  const errors: any = {};
  fields.forEach((field) => {
    const error = field.validators
      .map((validator: string) => {
        if (Object.hasOwnProperty.call(validators, validator)) {
          if (["enum", "array"].includes(validator))
            return validators[validator](field.value, field.options);
          return validators[validator](field.value);
        }
      })
      .filter((v) => typeof v === "string");
    if (error.length > 0) {
      errors[field.key] = error;
    }
  });
  return { valid: Object.values(errors).length === 0, errors };
}
