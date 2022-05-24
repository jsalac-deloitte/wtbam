import React from "react";

type InputProps = {
  name: string;

  placeholder: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeypress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  additionalAttributes?: Object;
};

export const InputText: React.FC<InputProps> = ({
  placeholder,
  handleChange,
  handleKeypress,
  additionalAttributes,
  name,
}) => {
  return (
    <input
      name={name}
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      onKeyPress={handleKeypress}
      {...additionalAttributes}
    />
  );
};

export default InputText;
