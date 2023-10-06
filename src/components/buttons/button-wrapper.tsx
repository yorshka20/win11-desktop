import { noop } from '../../utils/helper';
import './style.less';

export function ButtonWrapper({
  children,
  className = '',
  onclick = noop,
}: {
  children: React.JSX.Element;
  className?: string;
  onclick?: () => void;
}) {
  return (
    <div onClick={onclick} className={`common-button-wrapper ${className}`}>
      {children}
    </div>
  );
}
