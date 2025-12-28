// App.js
// Main application with Figma-style fullscreen layout

import { PipelineUI } from './ui';
import { FooterToolbar } from './FooterToolbar';
import { ShortcutsHelp } from './ShortcutsHelp';
import { WelcomeModal } from './WelcomeModal';
import './index.css';

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
