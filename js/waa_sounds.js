
/*
    ------------------------- init -------------------------
*/

var BUFFERS = {}; // Keep track of all loaded buffers.
var context = null; // Page-wide audio context.
const visulize_canvas = document.getElementById("visualizer");
const viz_context = visulize_canvas.getContext("2d");

function loadBuffers() { // Load musics into the buffers object.
  var names = [];
  var paths = [];
  for (var name in sounds_config) {
    var path = sounds_config[name]['music'];
    names.push(name);
    paths.push(path);
  }
  bufferLoader = new BufferLoader(context, paths, function(bufferList) {
    for (var i = 0; i < bufferList.length; i++) {
      var buffer = bufferList[i];
      var name = names[i];
      BUFFERS[name] = buffer;
    }
  });
  bufferLoader.load();
}

document.addEventListener("DOMContentLoaded", function() {
  try {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    audio_gain = context.createGain();
    audio_gain.connect(context.destination);
    analyser = context.createAnalyser();
    audio_gain.connect(analyser);
    // Create a data arry to store soundwave data
    audio_data = new Float32Array(analyser.frequencyBinCount);
    analyser.getFloatTimeDomainData(audio_data);
  } catch (e) {
    alert("There is some problem in Loading Web Audio API");
  }
  loadBuffers();
});

/*
    ------------------------- Playinstrument -------------------------
*/
function playSound(buffer_id) {
  let buffer = BUFFERS[buffer_id]
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.connect(audio_gain);
  this.source = source;
  if (!source.start) source.start = source.noteOn;
  source.start(0);
  drawVisual();
}

/*
    ------------------------- Draw waves on canvas -------------------------
*/
function drawVisual() {
  requestAnimationFrame(drawVisual);
  let height = visulize_canvas.height,
      width = visulize_canvas.width;
  // Clear existing canvas
  viz_context.clearRect(0, 0, width, height);
  viz_context.beginPath();

  // update data from analyser
  analyser.getFloatTimeDomainData(audio_data);

  // draw line
  for (let i = 0; i < audio_data.length; i++) {
    const x = i;
    const y = (0.5 + audio_data[i] / 2) * height;
    if (i == 0) {
      viz_context.moveTo(x, y);
    } else {
      viz_context.lineTo(x, y);
    }
  }
  viz_context.lineWidth = 2;
  viz_context.strokeStyle = "black";
  viz_context.stroke();
}
