/**
 * This class should construct the components
**/

var canvas = new Canvas(document.getElementById("canvas"));

// Initial draw
window.requestAnimationFrame(canvas.redraw());
