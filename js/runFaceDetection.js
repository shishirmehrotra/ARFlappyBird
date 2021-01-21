  // Moved from main index.html
    let forwardTimes = []

    function updateTimeStats(timeInMs) {
      forwardTimes = [timeInMs].concat(forwardTimes).slice(0, 30)
      const avgTimeInMs = forwardTimes.reduce((total, t) => total + t) / forwardTimes.length
      $('#time').val(`${Math.round(avgTimeInMs)} ms`)
      $('#fps').val(`${faceapi.utils.round(1000 / avgTimeInMs)}`)
    }




    async function onPlay() {
      const videoEl = $('#inputVideo').get(0)

      if(videoEl.paused || videoEl.ended || !isFaceDetectionModelLoaded())
        return setTimeout(() => onPlay())


      const options = getFaceDetectorOptions()

      const ts = Date.now()

      const result = await faceapi.detectSingleFace(videoEl, options)

      updateTimeStats(Date.now() - ts)

      if (result) {
        const canvas = $('#overlay').get(0)
        const dims = faceapi.matchDimensions(canvas, videoEl, true)
        //faceapi.draw.drawDetections(canvas, faceapi.resizeResults(result, dims))
        flappy.x(dims.width - (result.box.x + result.box.width / 2));
        flappy.y(result.box.y + result.box.height / 2);
        layer.batchDraw();
        //console.log("x: " + result.box.x + "y: " + result.box.y);

        if(flappyIsLookingForStartButton) {
            if(checkIfFlappyHitStartButton(startButton))
              nextTransitionFunction();
        }
 
      }

      setTimeout(() => onPlay())
    }

    var streamParameters;
    var isSafari = false;
    var isIPad = false;
    var isPortrait = false;
    var isAndroid = false;
    var errorMessage = "";

    async function runFaceDetection() {
      // load face detection model
      await changeFaceDetector(TINY_FACE_DETECTOR)
      changeInputSize(224)

      // try to access users webcam and stream the images
      // to the video element

    var idealWidth  = Math.min(window.innerWidth, screen.width);
    var idealHeight = Math.min(window.innerHeight, screen.height);

    streamParameters =      
      { video: 
        {
          width:  idealWidth, 
          height: idealHeight
        }
      };

    isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    isIPad = /^((?!chrome|android).)*iPad/i.test(navigator.userAgent);
    isAndroid = /^((?!safari).)*Android/i.test(navigator.userAgent);
    isPortrait = window.matchMedia("(orientation: portrait)").matches;
      
      //if(window.innerHeight > window.innerWidth) 
      if(    
        //(isAndroid && isPortrait)
          //|| 
        (isSafari && !isIPad && idealHeight > idealWidth)
        )
       { 
          streamParameters =  
            { video: 
              {width: idealHeight}, 
              height: {max: idealWidth} 
            }
 
        }
    
      //try {
        const stream = await navigator.mediaDevices.getUserMedia(streamParameters);
      //} 
      //catch(err) {
      //  console.log(err);
      //  errorMessage = err;
      //}
      updateDebug();


//        { video: {width: {exact: videoWidth}, height: {exact: videoHeight} }} );
      const videoEl = $('#inputVideo').get(0)
      //videoEl.width = videoWidth; videoEl.height = videoHeight;
      videoEl.srcObject = stream
      sizeGame();
      
      // TO TRY: videoEl.addEventListener('loadedmetadata', startWelcome);
      videoEl.addEventListener('playing', startWelcome);
      const canvas = $('#overlay').get(0);
      const dims = faceapi.matchDimensions(canvas, videoEl, true);
      //const konvaContainer = $('#container').get(0);
      //const dims2 = faceapi.matchDimensions(konvaContainer, videoEl, true);

      videoHeight = dims.height;
      videoWidth = dims.width;



      // startGame();
    }
