// alert("working!!!");
// $("h1").text("bye world");
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
// c.fillStyle = "rgba(0 ,0 ,255, 0.5)";
// c.fillRect(400,100,100,100);
// c.fillRect(300,0,100,100);
// c.fillStyle= "rgba(0,255,0,0.5)";
// c.fillRect(300,200,100,100);
// c.fillRect(500,0,100,100);
// c.fillStyle= "rgba(255,0,0,0.5)";
// c.fillRect(500,200,100,100);
//
// //line
// c.beginPath();
// c.moveTo(300,0);
// c.lineTo(450,150);
// c.lineTo(600,0);
// c.strokeStyle = "yellow";
// c.stroke();
// c.beginPath();
// c.moveTo(300,300);
// c.lineTo(450,150);
// c.lineTo(600,300);
// c.strokeStyle = 'blue';
// c.stroke();
// //arc/circle
// c.beginPath()
// c.strokeStyle = 'gold';
// c.arc(450,150,50,Math.PI*2,false);
// c.stroke();
// //using loop
// // var z = Math.floor(Math.random()*1000)+1;
// for(var i = 0;i<150;i++){
//   var x = Math.floor(Math.random()*window.innerWidth);
//   var y = Math.floor(Math.random()*window.innerHeight);
//   c.beginPath()
//   if(i%3==0&&i%5==0){
//     c.strokeStyle = 'red';}
//   else if(i%5==0){
//     c.strokeStyle = 'gold';
//   }else if (i%3==0) {
//     c.strokeStyle = '#30D5C8';
//   }
//   else{c.strokeStyle= 'blue';}
//   c.arc(x,y,50,Math.PI*2,false);
//   c.stroke();
//   // z = z+10;
// }

// c.beginPath()
// c.arc(x,y,radius,Math.PI*2,false);
// c.strokeStyle = 'green';
// c.stroke();
var mouse = {
  x: undefined,
  y: undefined
}
var maxRadius = 100;
// var minRadius = 10;
var colorArray = ["red",'blue','yellow','green','purple','indigo','orange']
window.addEventListener('mousemove',function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})
window.addEventListener('resize',function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})
function Circle(x,y,dx,dy,radius){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random()*colorArray.length)]

        this.draw = function(){
          c.beginPath();
          c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
          c.fillStyle = this.color
          c.stroke();
        }
        this.update = function(){
          //for bouncing off after coming towards the border
          if (this.x+this.radius>innerWidth||this.x-this.radius<0){
            this.dx=-this.dx;
          }
          if(this.y+this.radius>innerHeight||this.y-this.radius<0){
            this.dy=-this.dy
          }
//for movement, changing coordinate and refreshing giving the illusion that it is moving
          this.x = this.x+this.dx;
          this.y = this.y+this.dy
//interactivity, for the radius to increase if hover by the mouse
          if(mouse.x-this.x<100&&mouse.x-this.x>-100&&mouse.y-this.y<100&&mouse.y-this.y>-100){
              if(this.radius<maxRadius){
                this.radius += 1
              }
          }else if(this.radius>this.minRadius){this.radius-=1};
          this.draw();

        }
}

// var circle = new Circle(200,200,3,3,50);
var circleArray = [];

function init(){
  circleArray = [];
  for(var i = 0;i<2000;i++){
    var dx =(Math.random()-0.5);
    var x = Math.random()*(innerWidth-2*radius)+radius;
    var y =Math.random()*(innerHeight-2*radius)+radius;
    var dy  = (Math.random()-0.5);
    var radius = Math.random()*5+1;
    circleArray.push(new Circle(x,y,dx,dy,radius));
  }

}
function animate(){
      requestAnimationFrame(animate);
      c.clearRect(0,0,innerWidth,innerHeight);
      for (var i = 0; i < circleArray.length; i++) {
        if(i%3==0&&i%5==0){
            c.strokeStyle = 'red';}
          else if(i%5==0){
            c.strokeStyle = 'green';
          }else if (i%3==0) {
            c.strokeStyle = 'purple';
          }
          else{c.strokeStyle= 'blue';}
          c.fill();
          if(i%3==0&&i%5==0){
              c.fillStyle = 'black';}
            else if(i%5==0){
              c.fillStyle = 'white';
            }else if (i%3==0) {
              c.fillStyle = 'pink';
            }
            else{c.fillStyle= 'gold';}
        circleArray[i].update();
      }

}
init();
animate();
