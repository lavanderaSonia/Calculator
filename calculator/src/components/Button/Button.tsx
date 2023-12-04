import './Button.scss';
export type ButtonProps = React.HTMLProps<HTMLButtonElement>;
export const Button = ({
  label,
  onClick,
  className
}: ButtonProps) => {

  const styleClass = `button ${className ?? ''}`;

  return (
    <button className={styleClass} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button;