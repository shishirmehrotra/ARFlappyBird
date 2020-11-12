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
        faceapi.draw.drawDetections(canvas, faceapi.resizeResults(result, dims))
        flappy.x(result.box.x + result.box.width / 2);
        flappy.y(result.box.y + result.box.height / 2);
        layer.batchDraw();
        //console.log("x: " + result.box.x + "y: " + result.box.y);
      }

      setTimeout(() => onPlay())
    }

      var videoWidth;
      var videoHeight;

    async function runFaceDetection() {
      // load face detection model
      await changeFaceDetector(TINY_FACE_DETECTOR)
      changeInputSize(224)

      // try to access users webcam and stream the images
      // to the video element



      if(false && window.matchMedia("(orientation: portrait").matches) 
        { videoWidth = window.innerHeight; videoHeight = window.innerWidth;}
      else 
        { videoWidth = window.innerWidth; videoHeight = window.innerHeight;}


      const stream = await navigator.mediaDevices.getUserMedia(
        { video: {width: videoWidth, height: videoHeight} });
      const videoEl = $('#inputVideo').get(0)
      //videoEl.width = videoWidth; videoEl.height = videoHeight;
      videoEl.srcObject = stream
      sizeGame();
      //videoEl.addEventListener('playing', startGame );
      videoEl.addEventListener('playing', startWelcome);

      // startGame();
    }
