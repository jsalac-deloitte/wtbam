type ButtonProps = {
  handleClick: () => void;
  label: string;
  additionalAttributes?: Object;
};

const Button: React.FC<ButtonProps> = ({
  handleClick,
  label,
  additionalAttributes,
}) => {
  return (
    <button {...additionalAttributes} onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
