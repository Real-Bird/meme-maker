"use strict";

const canvas = document.querySelector("canvas");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const currentColor = document.querySelector(".current-color");
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");

let isPainting = false;
let isFilling = false;

function onMousemove({ offsetX, offsetY }) {
  if (isPainting) {
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(offsetX, offsetY);
}

function startPainting() {
  ctx.beginPath();
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
}

function onLineWidthChange({ target: { value } }) {
  ctx.lineWidth = value;
}

let fillingModeColor = "#d2b48c";

function onChangeColor({
  target: {
    value,
    dataset: { color },
  },
}) {
  if (isFilling) {
    fillingModeColor = color;
  }
  ctx.strokeStyle = value ? value : color;
  ctx.fillStyle = value ? value : color;
  currentColor.style.background = value ? value : color;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.beginPath();
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    isFilling = false;
    modeBtn.innerText = "Fill";
  }
}

function onDestroyClick() {
  ctx.beginPath();
  ctx.fillStyle = "tan";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.beginPath();
  ctx.strokeStyle = fillingModeColor;
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange({ target: { files } }) {
  const file = files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = "";
  };
}

function onDoubleClick({ offsetX, offsetY }) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "48px serif";
    // ctx.strokeText(text, offsetX, offsetY);
    ctx.fillText(text, offsetX, offsetY);
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("mousemove", onMousemove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onChangeColor);

colorOptions.forEach((colorOption) =>
  colorOption.addEventListener("click", onChangeColor)
);

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
