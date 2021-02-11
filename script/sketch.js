let mobilenet;

let video;
let label;

function preload() {
  video = createCapture({
    video: {
      facingMode: { ideal: "environment" }
    }
  });
}

function setup() {
  // put setup code here
  createCanvas(640, 480);
  background(0);
  video.hide();


  const handlePrediction = (error, results) => {
    if (error) {
      console.error(error);
    } else {
      // console.log(results);
      label = results.map(it => `${(it.confidence * 100 ).toFixed(0)}% ${it.label}`).join('\n');
    }

    mobilenet.predict(handlePrediction);
  }

  mobilenet = ml5.imageClassifier('MobileNet', video, () => {
    console.log('Model is ready!!!!');

    mobilenet.predict(handlePrediction);
  });
}


function draw() {
  // put drawing code here
  background(0);
  image(video, 0, 0);

  fill(196);
  textSize(18);
  text(label, 10, height - 50);
}