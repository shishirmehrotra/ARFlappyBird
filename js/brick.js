function Brick(xPercent, yPercent, wPercent, hPercent) {

  // Set up the variables

  // Save the variables this set of Bricks were constructed with
  this.xPercent = xPercent;
  this.yPercent = yPercent;
  this.wPercent = wPercent;
  this.hPercent = hPercent;
  
  // Both top and bottom pipes share these values
  this.y = yPercent * stage.height();
  this.x = xPercent* stage.width();
  this.w = wPercent * stage.width();
  this.h = hPercent*stage.height();

  // These values are different for the top and bottom pipe
  this.strength = level;
  this.color = "#FFFFFF";
  //this.isScored = false;



// Create the rectangles for the pipes

  this.brickRect = new Konva.Rect({
    x: this.x ,
    y: this.y,
    width: this.w,
    height: this.h,
    fill: this.color,
    stroke: 'black',
    strokeWidth: 2,  
  })
  


  this.setColor = function() {
    if (this.strength <= 1){
      this.color = "#FFFFFF";
    } 
    if (this.strength === 2){
      this.color = "#FFCCCC";
    } 
    if (this.strength === 3){
      this.color = "#FF9999";
    } 
    if (this.strength === 4){
      this.color = "#FF6666";
    } 
    if (this.strength === 5){
      this.color = "#FF3333";
    } 
    if (this.strength >= 6){
      this.color = "#FF0000";
    }



    this.brickRect.fill(this.color);
    layerPong.batchDraw();

  }
  
  this.setColor();

  layerPong.add(this.brickRect);
  
  this.drawBrick = function () {
    this.setColor();
    layerPong.batchDraw();
  }


  this.clearBrick = function() {
    this.brickRect.destroy();
    layerPong.batchDraw();
  }

// Was this brick hit?
  this.checkBrickHit = function (bX, bY, bR) {
    if (this.strength <= 0) return;
    if (bX + bR > this.x && bX - bR < this.x + this.w && bY + bR > this.y && bY - bR < this.y + this.h){
      this.strength = this.strength - 1;
      pongDirection = -1 * pongDirection;
      pongSlope     = -1 * pongSlope; 

      this.setColor();
      score += 10 * level;
      
      brickHitSound.play();
      updateScorePong();

      // Check strength
      if (this.strength <= 0) {
        this.clearBrick();
        this.brickRect.destroy();
        //this.isScored = true;
      }
    }
  }

}