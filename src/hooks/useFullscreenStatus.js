import { useState, useLayoutEffect } from "react";

export default function useFullscreenStatus(elRef) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const exitFullscreen = (cb) => {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(cb);
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen().then(cb);
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      cb();
    }
  };

  const enterFullscreen = (el, cb) => {
    if (el.requestFullscreen) {
      el.requestFullscreen().then(cb);
    } else if (el.webkitEnterFullscreen) {
      el.webkitEnterFullscreen();
      cb();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
      cb();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen().then(cb);
    } else {
      const video = document.querySelector("video");
      video.webkitEnterFullscreen();
    }
  };

  const setFullscreen = (state) => {
    if (!elRef.current) return;

    if (state) {
      enterFullscreen(elRef.current, () => {
        setIsFullscreen(true);
      });
    } else {
      exitFullscreen(() => {
        setIsFullscreen(false);
      });
    }
  };

  useLayoutEffect(() => {
    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
    document.addEventListener("MSFullscreenChange", exitHandler);

    function exitHandler() {
      if (
        !document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        setIsFullscreen(false);
      }
    }
  });

  return [isFullscreen, setFullscreen];
}