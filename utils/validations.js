import { emailExpression } from "./expressions";

export const formValidation = (items) => {
  const passwordLength = 3;
  const errors = {
    hasError: false,
  };
  const passwordkeys = ["password", "repeatPassword"];
  const ignoredKeys = ["last_name", "is_onboarded"];
  Object.keys(items).forEach((key) => {
    if (ignoredKeys.includes(key)) return;
    const value = items[key];
    if (!value.length) return (errors[key] = "Required");
    if (key === "email") {
      if (!validEmail(value)) errors[key] = "Invalid email format";
    }
    if (passwordkeys.includes(key)) {
      if (value.length < passwordLength)
        return (errors[key] = `Must be at least ${passwordLength} characters`);
    }
  });

  errors.hasError = Object.keys(errors).length > 1;

  return errors;
};

function validEmail(email) {
  return email.toLowerCase().match(emailExpression);
}
