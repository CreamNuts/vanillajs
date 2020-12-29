const canvas = document.querySelector(".jsCanvas");
const ctx = canvas.getContext("2d");
const canvasStyle = window.getComputedStyle(document.querySelector(".canvas"));
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector(".jsRange");
const mode = document.querySelector(".jsMode ");
const saveBtn = document.querySelector(".jsSave");

const FOCUS_CN = "focus";
const POINTER_CN = "pointer";

const INITIAL_COLOR = "#2c2c2c";

canvas.width = parseInt(canvasStyle.width);
canvas.height = parseInt(canvasStyle.height);

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(event) {
  if (event.button == 0) {
    if (!filling) {
      painting = true;
    }
  }
}

function stopPainintg() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  Array.from(event.target.parentNode.children).forEach((otherBtn) =>
    otherBtn.classList.remove(FOCUS_CN)
  );
  event.target.classList.add(FOCUS_CN);
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling) {
    filling = false;
    canvas.classList.remove(POINTER_CN);
    mode.innerText = "Fill";
  } else {
    filling = true;
    canvas.classList.add(POINTER_CN);
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleRightClick(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaingJS.png";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainintg);
  canvas.addEventListener("mouseleave", stopPainintg);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleRightClick);
}

colors.forEach((color) => color.addEventListener("click", handleColorClick));

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
