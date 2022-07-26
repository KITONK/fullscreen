import React, { useRef } from 'react';

import './App.css';
import useFullscreenStatus from "./hooks/useFullscreenStatus";

function App() {

  const videoContainerElement = useRef();

  const [isFullscreen, setFullscreen] = useFullscreenStatus(
    videoContainerElement
  );

  return (
    <div className="App">
        <img ref={videoContainerElement} src="/images/test.jpg" alt="" />
        <button class="button" onClick={() => setFullscreen(!isFullscreen)}>
          <span>Fullscreen</span>
        </button>
    </div>
  );
}

export default App;
