import { useEffect, useState } from 'react';
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
  const { windowManager } = useWindowContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [previewContent, setPreviewContent] = useState<any[]>([]);

  useEffect(() => {
    const sub = store.subscribeState('taskbarPreview', (content) => {
      console.log('content', content);
      if (content === 'Explorer') {
        const wins = windowManager.getAllWindows();
        setPreviewContent(wins.map((w) => w.data));
      } else if (content === 'none') {
        setPreviewContent([]);
      }
    });

    return () => sub.unsubscribe();
  }, [windowManager]);

  return (
    <Container
      $show={!!previewContent.length}
      className="flex flex-row justify-between items-center"
    >
      {previewContent.map((item) => (
        <PreviewItem key={item.id}>{item.title}</PreviewItem>
      ))}
    </Container>
  );
};

const PreviewContainer = styled.div`
  width: 200px;
  height: 100%;

  border-radius: 6px;
  border: 1px solid #f0f3f9;
`;

function PreviewItem({ children }: { children: React.JSX.Element }) {
  return (
    <PreviewContainer className="flex justify-center items-center">
      {children}
    </PreviewContainer>
  );
}
