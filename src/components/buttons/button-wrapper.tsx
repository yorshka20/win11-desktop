import { noop } from '../../utils/helper';
import './style.less';

interface Props {
  children: React.JSX.Element;
  className?: string;
  title?: string;
  id?: string;
  onClick?: () => void;
}

export function ButtonWrapper({
  children,
  title,
  id,
  className = '',
  onClick = noop,
}: Props) {
  return (
    <div
      onClick={onClick}
      title={title}
      id={id}
      className={`common-button-wrapper flex justify-center items-center ${className}`}
    >
      {children}
    </div>
  );
}
