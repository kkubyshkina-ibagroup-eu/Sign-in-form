const REQUIRED_FIELD = "Required field";

export const loginValidation = {
  required: REQUIRED_FIELD,
  validate: (value) => {
    if (value.match(/[а-яА-Я]/)) {
      return "A login must contain only latin characters";
    } else if (value.length < 8)
      return "A login must contain at least 8 characters";
    return true;
  },
};

export const passwordValidation = {
  required: REQUIRED_FIELD,
  validate: (value) => {
    if (value.match(/[а-яА-Я]/)) {
      return "A password must contain only latin characters";
    } else if (value.length < 8)
      return "A password must contain at least 8 characters";
    return true;
  },
};
