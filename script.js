(() => {

  if (window.BlumAC) return;
  window.BlumAC = true;

  const c = [208, 216, 0];
  const t = 5;

  setInterval(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) findAndClickGreenObjects(canvas);
  }, 100);

  function findAndClickGreenObjects(screenCanvas) {
    const context = screenCanvas.getContext('2d');
    const width = screenCanvas.width;
    const height = screenCanvas.height;
    const imageData = context.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    for (let x = 0; x < width; x += 1) {
      for (let y = 0; y < height; y += 1) {
        const index = (y * width + x) * 4;
        const r = pixels[index];
        const g = pixels[index + 1];
        const b = pixels[index + 2];
        const greenishRange = (c[0] - t < r && r < c[0] + t) && (c[1] - t < g && g < c[1] + t) && (c[2] - t < b && b < c[2] + t);

        if (greenishRange) {
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