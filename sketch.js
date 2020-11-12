const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var stand;
var box1,box2,box3;
var slingShot;
var polygon1;
var gamestates = "onSling";

function preload() {
  
}
function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    stand  = new Ground(800,380,350,20);
    box1 = new Box(700,100,50,50);
    box2 = new Box(700,200,50,50);
    box3 = new Box(700,300,50,50);

    var options= {
        'restitution':0.8,
        'friction':1.0,
        'density':1.0
    }
    polygon1 = Bodies.circle(50,200,20,options);
    World.add(world,polygon1);

    slingShot = new Slingshot(this.polygon1,{x:300,y:100});
    
}

function draw(){
    background(0);
    Engine.update(engine);

    text(mouseX+","+mouseY,mouseX,mouseY);
    strokeWeight(4);
    stand.display();
    box1.display();
    box2.display();
    box3.display();
    slingShot.display();
    ellipseMode(RADIUS);
    fill(255);
    ellipse(polygon1.position.x,polygon1.position.y,20,20);

 }
 function mouseDragged(){
     if (gamestates !== "onSling"){

    Matter.Body.setPosition(this.polygon1,{x:mouseX,y:mouseY});
}
 }
function mouseReleased(){
   
    slingShot.fly();
    gamestates = "launch";
}
function keyPressed(){
    if(keyCode === 32){
        slingShot.attach(polygon1.body);
    }
}