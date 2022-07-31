"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(50, 50, 100, 100);
ctx.strokeRect(160, 50, 100, 100);

ctx.rect(270, 50, 100, 100);
ctx.fill();

ctx.beginPath();
ctx.rect(380, 50, 100, 100);
ctx.fillStyle = "red";
ctx.fill();

ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.strokeStyle = "red";
ctx.stroke();

ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(50, 150);
ctx.strokeStyle = "blue";
ctx.stroke();

ctx.beginPath();
ctx.fillStyle = "black";
ctx.strokeStyle = "black";
ctx.fillRect(200, 400, 50, 200);
ctx.fillRect(400, 400, 50, 200);
ctx.lineWidth = 2;
ctx.strokeRect(300, 500, 50, 100);
ctx.fillRect(200, 400, 200, 20);
ctx.moveTo(180, 400);
ctx.lineTo(325, 350);
ctx.lineTo(470, 400);
ctx.fillStyle = "tomato";
ctx.fill();

ctx.beginPath();
ctx.moveTo(200, 600);
ctx.lineTo(450, 600);
ctx.stroke();

ctx.beginPath();
ctx.arc(310, 560, 3, 5, 10);
ctx.fillStyle = "black";
ctx.fill();

// head
ctx.beginPath();
ctx.arc(580, 470, 30, 0, 2 * Math.PI);
ctx.fill();

// eyes
ctx.beginPath();
ctx.arc(565, 465, 8, 0, 2 * Math.PI);
ctx.arc(595, 465, 8, 0, 2 * Math.PI);
ctx.fillStyle = "white";
ctx.fill();

// mouth
ctx.beginPath();
ctx.arc(580, 480, 5, 0, 1 * Math.PI);
ctx.fillStyle = "white";
ctx.fill();

// body
ctx.beginPath();
ctx.fillStyle = "black";
ctx.fillRect(565, 500, 30, 80);

// left arm
ctx.beginPath();
ctx.moveTo(565, 500);
ctx.lineTo(540, 560);
ctx.lineWidth = 10;
ctx.stroke();

// right arm
ctx.beginPath();
ctx.moveTo(595, 500);
ctx.lineTo(620, 560);
ctx.lineWidth = 10;
ctx.stroke();

// left leg
ctx.beginPath();
ctx.moveTo(570, 570);
ctx.lineTo(565, 650);
ctx.lineWidth = 10;
ctx.stroke();

// right leg
ctx.beginPath();
ctx.moveTo(590, 570);
ctx.lineTo(595, 650);
ctx.lineWidth = 10;
ctx.stroke();
