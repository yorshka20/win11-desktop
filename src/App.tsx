import { useEffect, useState } from 'react';

import './app.less';
import { StartMenu } from './components/start-menu';
import { TaskBar } from './components/task-bar';
import { taskbarButtonsConfig } from './configs/desktop-config';
import { WindowContextProvider } from './context/context-provider';
import { DesktopContainer, type DesktopItem } from './page';

function App() {
  const [desktopConfig, setDesktopConfig] = useState<DesktopItem[]>([]);

  const [taskbarButtons] = useState(taskbarButtonsConfig);

  useEffect(() => {
    console.log('refresh');
  });

  useEffect(() => {
    const config: DesktopItem[] = [];
    setDesktopConfig(config);
  }, []);

  return (
    <WindowContextProvider>
      <div
        id="window-gui-container"
        className="flex min-w-full justify-between min-h-screen min-w-screen flex-col"
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
      </div>
    </WindowContextProvider>
  );
}

export default App;
