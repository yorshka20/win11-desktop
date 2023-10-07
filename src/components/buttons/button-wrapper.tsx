import { noop } from '../../utils/helper';
import './style.less';

export function ButtonWrapper({
  children,
  title,
  id,
  className = '',
  onClick = noop,
}: {
  children: React.JSX.Element;
  className?: string;
  title?: string;
  id?: string;
  onClick?: () => void;
}) {
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
