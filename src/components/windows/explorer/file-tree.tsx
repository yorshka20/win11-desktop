import { useState } from 'react';

export function FileTreeItemWrapper({ children }) {
  const [focused, setFocused] = useState(false);

  function handleClick() {
    setFocused((f) => !f);
  }

  return (
    <p
      onClick={handleClick}
      className={`file-tree-item-wrapper w-full ${focused ? 'focused' : ''}`}
    >
      {children}
    </p>
  );
}
