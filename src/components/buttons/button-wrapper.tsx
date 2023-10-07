import { noop } from '../../utils/helper';
import './style.less';

export function ButtonWrapper({
  children,
  className = '',
  onClick = noop,
}: {
  children: React.JSX.Element;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className={`common-button-wrapper ${className}`}>
      {children}
    </div>
  );
}
