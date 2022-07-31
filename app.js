"use strict";

const canvas = document.querySelector("canvas");
const lineWidthChangeBtn = document.createElement("button");
lineWidthChangeBtn.innerText = "Change Line Width!";
lineWidthChangeBtn.style.marginTop = "5px";
const cbxWrapper = document.createElement("div");
cbxWrapper.style.display = "flex";
cbxWrapper.style.flexFlow = "row";
const lineWidthChangeLabel = document.createElement("label");

[1, 2, 3, 4, 5].map((i) => {
  const lineWidthChangeCbx = document.createElement("input");
  lineWidthChangeCbx.type = "radio";
  lineWidthChangeCbx.value = i;
  lineWidthChangeCbx.name = "line-width";
  lineWidthChangeLabel.appendChild(lineWidthChangeCbx);
});
cbxWrapper.appendChild(lineWidthChangeLabel);
document.querySelector("body").appendChild(cbxWrapper);
document.querySelector("body").appendChild(lineWidthChangeBtn);
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;
const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
const colors1 = [
  "#2d3436",
  "#e84393",
  "#d63031",
  "#e17055",
  "#fdcb6e",
  "#00b894",
  "#00cec9",
  "#0984e3",
  "#6c5ce7",
  "#b2bec3",
];
const colors2 = [
  "#636e72",
  "#fd79a8",
  "#ff7675",
  "#fab1a0",
  "#ffeaa7",
  "#55efc4",
  "#81ecec",
  "#74b9ff",
  "#a29bfe",
  "#dfe6e9",
];

let isPainting = false;

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
  const color1 = colors1[Math.ceil(Math.random() * colors1.length)];
  const color2 = colors2[Math.ceil(Math.random() * colors2.length)];
  console.log(color1, color2);
  grd.addColorStop(0, color1);
  grd.addColorStop(1, color2);
  ctx.strokeStyle = grd;
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
}

let lineWidthValue;
function getLineWidthValue({ target: { value } }) {
  lineWidthValue = value;
}

function lineWidthChange() {
  ctx.lineWidth = +lineWidthValue;
}

canvas.addEventListener("mousemove", onMousemove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
lineWidthChangeLabel.addEventListener("click", getLineWidthValue);
lineWidthChangeBtn.addEventListener("click", lineWidthChange);
