import { useEffect, useState } from 'react';
import styled from 'styled-components';

import './app.less';
import { StartMenu } from './components/start-menu';
import { TaskBar } from './components/task-bar';
import { taskbarButtonsConfig } from './configs/desktop-config';
import { WindowContextProvider } from './context/context-provider';
import { useContextState } from './hooks';
import { DesktopContainer, type DesktopItem } from './page';
import { generateWallpaperUrl } from './utils/helper';

interface StyledProps {
  $wallpaper: string;
}

const MainContainer = styled.div<StyledProps>`
  background: url(${(props) => generateWallpaperUrl(props.$wallpaper)});

  background-size: cover;
`;

function App() {
  const [desktopConfig, setDesktopConfig] = useState<DesktopItem[]>([]);

  const [taskbarButtons] = useState(taskbarButtonsConfig);

  const wallpaper = useContextState('wallpaper');

  useEffect(() => {
    console.warn('App refreshed');
  });

  useEffect(() => {
    const config: DesktopItem[] = [];
    setDesktopConfig(config);
  }, []);

  return (
    <WindowContextProvider>
      <MainContainer
        id="window-gui-container"
        className="flex min-w-full justify-between min-h-screen min-w-screen flex-col"
        $wallpaper={wallpaper}
      >
        {/* desktop. containing icons. window components are mounted here. */}
        <DesktopContainer desktopConfig={desktopConfig} />
        {/* taskbar component. */}
        <TaskBar buttons={taskbarButtons} />

        {/* components below take no position in layout. */}
        <>
          {/* float menu layer. */}
          <StartMenu />
        </>
      </MainContainer>
    </WindowContextProvider>
  );
}

export default App;
