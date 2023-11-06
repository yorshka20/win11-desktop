import { type RefObject, memo } from 'react';

import { useDesktopSelection } from './hook';

interface Props {
  selectionRef: RefObject<HTMLDivElement>;
}

export const DesktopSelectionContainer = memo(({ selectionRef }: Props) => {
  useDesktopSelection(selectionRef);

  return <div id="desktop-selection" className="desktop-selection" />;
});
