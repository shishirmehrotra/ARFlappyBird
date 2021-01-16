function Pipe(xPercent, yPercent, gapPercent, widthPercent) {

// Set up the variables

  // Save the variables this set of pipes were constructed with
  this.xPercent = xPercent;
  this.yPercent = yPercent;
  this.gapPercent = gapPercent;
  this.widthPercent = widthPercent;
  
  // Both top and bottom pipes share these values
  this.pipeWidth = widthPercent * windowWidth;
  this.x = xPercent*windowWidth;

  // These values are different for the top and bottom pipe
  this.yTop = 0;
  this.hTop = yPercent*windowHeight;
  this.yBottom = (yPercent + gapPercent)*windowHeight;
  this.hBottom = windowHeight - this.yBottom; 
  this.isScored = false;

// Create the rectangles for the pipes

  this.bottomBase = new Konva.Rect({
    x: this.x,
    y: this.yBottom,
    width: this.pipeWidth,
    height: this.hBottom,
    fillLinearGradientStartPoint: { x: -50, y: -50 },
    fillLinearGradientEndPoint: { x: 50, y: 50 },
    fillLinearGradientColorStops: [0, 'lime', 1, 'green'],  
    stroke: 'black',
    strokeWidth: 4,
  });


  this.bottomCap = new Konva.Rect({
    x: this.x - 0.1*this.pipeWidth,
    y: this.yBottom,
    width: 1.2* this.pipeWidth,
    height: 0.05 * windowHeight,
    fillLinearGradientStartPoint: { x: -50, y: -50 },
    fillLinearGradientEndPoint: { x: 50, y: 50 },
    fillLinearGradientColorStops: [0, 'lime', 1, 'green'],
    stroke: 'black',
    strokeWidth: 4,  
  });
  

  this.topBase = new Konva.Rect({
    x: this.x,
    y: this.yTop,
    width: this.pipeWidth,
    height:this.hTop,
    fillLinearGradientStartPoint: { x: -50, y: -50 },
    fillLinearGradientEndPoint: { x: 50, y: 50 },
    fillLinearGradientColorStops: [0, 'lime', 1, 'green'],
    stroke: 'black',
    strokeWidth: 4,  
  })

  this.topCap = new Konva.Rect({
    x: this.x - 0.1*this.pipeWidth,
    y: this.hTop - 0.05*windowHeight,
    width: 1.2*this.pipeWidth,
    height: 0.05*windowHeight,
    fillLinearGradientStartPoint: { x: -50, y: -50 },
    fillLinearGradientEndPoint: { x: 50, y: 50 },
    fillLinearGradientColorStops: [0, 'lime', 1, 'green'],
    stroke: 'black',
    strokeWidth: 4,  
  })
  
  layer.add(this.bottomBase);
  layer.add(this.topBase);

  layer.add(this.bottomCap);
  layer.add(this.topCap);
  
  this.drawPipe = function () {
    layer.batchDraw();
  }


  this.clearPipe = function() {
    this.bottomBase.destroy();
    this.bottomCap.destroy();
    this.topBase.destroy();
    this.topCap.destroy();
    layer.batchDraw();
  }

// Move the pipe
  this.movePipe = function (distancePercent) {
    this.bottomBase.x(this.bottomBase.x() - (distancePercent * windowWidth));
    this.bottomCap.x(this.bottomCap.x() - (distancePercent * windowWidth));
    this.topBase.x(this.topBase.x() - (distancePercent * windowWidth));
    this.topCap.x(this.topCap.x() - (distancePercent * windowWidth));
    this.drawPipe();

    //Scoring
    if(this.bottomBase.x() < 0.25 * windowWidth && this.isScored === false){
      score += 10 * level;
      this.isScored = true;
      updateScore();

    }

  }


// Was this pipe hit?
/*
  this.checkPipeHit = function (x, y, w, h) {
    return false;
  }
  */

// Was this pipe hit?
  this.checkPipeHit = function (fX, fY, fW, fH) {
    
    if (fX + fW < this.bottomBase.x() || fX > this.bottomBase.x() + this.pipeWidth ) {
      // We are in front of or after the pipe, so no chance we're hitting it
      return false;
    }
    else {
      // We are inline with the pipe in the x direction, so now check the y direction
      if (fY + fH > this.bottomBase.y() || fY < this.topBase.y()+ this.topBase.height()) {
        return true;
      }
      else {
        return false;
      }
    }
  }

}