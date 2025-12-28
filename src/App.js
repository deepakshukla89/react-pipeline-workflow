// App.js
// Main application with Figma-style fullscreen layout

import { PipelineUI } from './features/canvas/Canvas';
import { FooterToolbar } from './components/layout/FooterToolbar';
import { ShortcutsHelp } from './components/layout/ShortcutsHelp';
import { WelcomeModal } from './components/modals/WelcomeModal';
import './styles/index.css';

function App() {
  return (
    <div className="app">
      <PipelineUI />
      <FooterToolbar />
      <ShortcutsHelp />
      <WelcomeModal />
    </div>
  );
}

export default App;
