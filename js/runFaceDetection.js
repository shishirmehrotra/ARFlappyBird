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

      // Run the face detection
      const result = await faceapi.detectSingleFace(videoEl, options)

      updateTimeStats(Date.now() - ts)

      if (result) {
        const canvas = $('#overlay').get(0)
        const dims = faceapi.matchDimensions(canvas, videoEl, true)
        
        // Draw box around face (hidden for now)
        //faceapi.draw.drawDetections(canvas, faceapi.resizeResults(result, dims))
        //console.log("x: " + result.box.x + "y: " + result.box.y);

        // Set flappy bird position to the center of the face
        flappy.x(dims.width - (result.box.x + result.box.width / 2));
        flappy.y(result.box.y + result.box.height / 2);
        layer.batchDraw();
      }

      setTimeout(() => onPlay())
    }

    var streamParameters;
    var isMac;;
    var isSafari = false;
    var isIPad = false;
    var isPortrait = false;
    var isAndroid = false;
    var errorMessage = "";
    var isIOS = false;

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

      isMac = navigator.userAgent.indexOf('Mac OS X') != -1;
      isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      //isIPad = /^((?!chrome|android).)*iPad/i.test(navigator.userAgent);
      //isIPad = /Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1;
      isIPad = 
        //navigator.platform.indexOf('iPad') !=1 || 
        navigator.maxTouchPoints && navigator.maxTouchPoints > 2 &&  /MacIntel/.test(navigator.platform);
      isAndroid = /^((?!safari).)*Android/i.test(navigator.userAgent);
      isPortrait = window.matchMedia("(orientation: portrait)").matches;
      isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || 
        navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
        
      // On Android phones and non-iPad iOS devices - video seems to come back in opposite orientation
      // So swap height and width
      if(    
        (isAndroid && isPortrait)
          || 
        (isIOS 
          //&& !isIPad 
          && idealHeight > idealWidth)
        )
       { 
          streamParameters =  
            { video: 
              {width: idealHeight, 
              height: {max: idealWidth} }
            }
 
        }
      
      // On iPad, window width is more reliable than screenwidth. Try to take the max of both
      // But isIPad is not reliable (new iphones report the same user agent, navigator platform, and touch points)
      //  so switched the logic to be about iOS portrait vs landscape
      
      if (isIOS && idealWidth > idealHeight) {
        streamParameters =  
            { video: 
              {width: Math.max(window.innerWidth, screen.width), 
              height: Math.max(window.innerHeight, screen.height)} 
            }
      }


      const stream = await navigator.mediaDevices.getUserMedia(streamParameters);
    /*
      //try {
        const stream = await navigator.mediaDevices.getUserMedia(streamParameters);
      //} 
      //catch(err) {
      //  console.log(err);
      //  errorMessage = err;
      //}
*/
/*
      const marginDiv = $('#inputVideo').get(0).getBoundingClientRect();	        
      windowWidth = marginDiv.width;	        //windowWidth = marginDiv.width;
      windowHeight = marginDiv.height;	        //windowHeight = marginDiv.height;
      videoWidth = windowWidth;	        videoWidth = windowWidth;
      videoHeight = windowHeight;
      streamParameters =  
          { video: 
            {width: idealWidth, 
            height: idealHeight}
          } */




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



    }
