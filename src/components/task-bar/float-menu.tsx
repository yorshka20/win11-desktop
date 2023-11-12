import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { store } from '../../context/store';
import { useWindowContext } from '../../hooks';

interface StyledProps {
  $show: boolean;
}

const Container = styled.div<StyledProps>`
  height: 120px;
  background-color: white;

  border-radius: 6px;

  position: absolute;
  bottom: 45px;
  left: 50%;
  transform: translate(-50%, ${({ $show }) => ($show ? 0 : '-9999px')});
`;

export const TaskBarFloatMenu = () => {
  const { windowManager, dispatcher } = useWindowContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [previewContent, setPreviewContent] = useState<any[]>([]);

  const handleEnter = useCallback(() => {
    dispatcher('hover-taskbar-preview', true);
  }, [dispatcher]);

  const handleLeave = useCallback(() => {
    dispatcher('hover-taskbar-preview', false);
  }, [dispatcher]);

  useEffect(() => {
    const sub = store.subscribeState('taskbarPreview', (content) => {
      console.log('taskbarPreview content:', content);
      if (content === 'none') {
        setPreviewContent([]);
        return;
      }

      if (content === 'Explorer') {
        const wins = windowManager.getAllWindows('Explorer');
        setPreviewContent(wins.map((w) => w.data));
      } else if (content === 'Setting') {
        const wins = windowManager.getAllWindows('Setting');
        setPreviewContent(wins.map((w) => w.data));
      } else if (content === 'Image') {
        const wins = windowManager.getAllWindows('Image');
        setPreviewContent(wins.map((w) => w.data));
      }
    });

    return () => sub.unsubscribe();
  }, [windowManager]);

  const handleClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const id = e.target['dataset']?.['id'];
    windowManager.focusWindow(id);
  };

  // focus window when hover on preview item.
  const handleFocus = useCallback(
    (id: string) => {
      windowManager.focusWindow(id);
    },
    [windowManager],
  );

  return (
    <Container
      $show={!!previewContent.length}
      className="flex flex-row justify-between items-center shadow-md"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick} // delegate click event
    >
      {previewContent.map((item) => (
        <PreviewItem onHover={handleFocus} id={item.id} key={item.id}>
          {item.title}
        </PreviewItem>
      ))}
    </Container>
  );
};

const PreviewContainer = styled.div`
  width: 200px;
  height: 100%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const PreviewItem = React.memo(function ({
  children,
  id,
  onHover,
}: {
  id: string;
  children: React.JSX.Element;
  onHover: (id: string) => void;
}) {
  const handleMouseEnter = (e: React.SyntheticEvent<HTMLDivElement>) => {
    onHover(e.target['dataset']?.['id']);
  };
  return (
    <PreviewContainer
      onMouseEnter={handleMouseEnter}
      data-id={id}
      className="flex justify-center items-center"
    >
      {children}
    </PreviewContainer>
  );
});
