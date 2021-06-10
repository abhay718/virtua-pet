var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedButton;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}
 
function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedButton = createButton("Feed the Dog");
  feedButton.position(700,95);
  feedButton.mousePressed(feedDog)
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.width = 100;
  addFood.height = 100
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
    
  foodObj.getfedTime();

  if(hour() > 12){
textSize(25);
fill("white");
textFont("Broadway")
  text("Last Fed: "+hour()%12+"pm", 200,95) 
  }

  if(hour() < 12){
    textSize(25);
    fill("white");
    textFont("Broadway")
      text("Last Fed: "+hour()%12+"am", 200,95) 
      }

  //write code to display text lastFed time here

 
  drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  database.ref('/').update({

    FeedTime: hour()


  })

  

  console.log(hour())        //inbuilt function that tells the system's hour

  foodS = foodS-1;
  database.ref('/').update({
    Food:foodS
  })


  if(foodS < 0){

  foodS = foodS * 0;

  }




  

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


