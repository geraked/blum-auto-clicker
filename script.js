(() => {

  if (window.BlumAC) return;
  window.BlumAC = true;

  const autoPlay = true;
  const gc = [208, 216, 0];
  const t = 5;

  if (autoPlay) {
    setInterval(() => {
      const playButton = document.querySelector("button.is-primary, .play-btn");
      if (!playButton) return;
      if (!playButton.textContent.toLowerCase().includes("play")) return;
      playButton.click();
    }, 5000)
  }

  setInterval(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) findAndClickObjects(canvas);
  }, 100);

  function findAndClickObjects(screenCanvas) {
    const context = screenCanvas.getContext('2d');
    const width = screenCanvas.width;
    const height = screenCanvas.height;
    const imageData = context.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    for (let x = 0; x < width; x += 1) {
      for (let y = 0; y < height; y += 1) {
        if (y < 70) continue;

        const index = (y * width + x) * 4;
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];

        const greenRange = (gc[0] - t < r && r < gc[0] + t) && (gc[1] - t < g && g < gc[1] + t) && (gc[2] - t < b && b < gc[2] + t);

        if (greenRange) {
          simulateClick(screenCanvas, x, y);
        }
      }
    }
  }

  function simulateClick(canvas, x, y) {
    const prop = {
      clientX: x,
      clientY: y,
      bubbles: true
    };
    canvas.dispatchEvent(new MouseEvent('click', prop));
    canvas.dispatchEvent(new MouseEvent('mousedown', prop));
    canvas.dispatchEvent(new MouseEvent('mouseup', prop));
  }

})();