var c = document.getElementById("canvas");
c.height = 200;
c.width = 200;
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(95,50,40,0,2*Math.PI);
ctx.stroke();

