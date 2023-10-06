import { useEffect, useState } from 'react';

import './app.less';
import { StartMenu } from './components/start-menu';
import { TaskBar } from './components/task-bar';
import { taskbarButtonsConfig } from './configs/desktop-config';
import { DesktopContainer, type DesktopItem, WindowContainer } from './page';

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
    <WindowContainer>
      <DesktopContainer desktopConfig={desktopConfig} />
      <TaskBar buttons={taskbarButtons} />
      <StartMenu />
    </WindowContainer>
  );
}

export default App;
