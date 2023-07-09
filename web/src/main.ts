import './style.css';

/// <reference path="vision.d.ts" />
import {
  GestureRecognizer,
  GestureRecognizerResult
} from '@mediapipe/tasks-vision';

import task from '../../exported_model/gesture_recognizer.task?url';
import { map } from './math.ts';
import { fileset } from './fileset.ts';
import {
  drawConnectors,
  drawLandmarks,
  drawRectangle,
  HAND_CONNECTIONS,
  NormalizedRect
} from './inport.ts';
import { Event, updateGesture, updatePosition } from './events.ts';
import './interact.ts';

const handCenter = [0, 5, 9, 13, 17];

const vision = await fileset();
const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
  baseOptions: {
    modelAssetPath: task,
    delegate: 'GPU'
  },
  numHands: 1,
  runningMode: 'VIDEO'
});

console.log(vision, gestureRecognizer);

const button = document.getElementById('enable-video') as HTMLButtonElement;
const video = document.getElementById('video') as HTMLVideoElement;
const canvas = document.getElementById('output_canvas') as HTMLCanvasElement;
const resultText = document.getElementById('result') as HTMLHeadingElement;
const marker = document.getElementById('marker') as HTMLDivElement;
const canvasCtx = canvas.getContext('2d')!!;

let prediction = false;

button.addEventListener('click', () => {
  prediction = !prediction;

  button.innerText = prediction ? 'Disable Video' : 'Enable Video';

  if (!prediction) {
    setTimeout(() => {
      video.pause();
      (video.srcObject as MediaStream).getTracks()[0].stop();
      // noinspection TypeScriptValidateTypes
      video.srcObject = null;
      clearVideo();
    }, 100);
    return;
  }
  const constraints = {
    video: true
  };

  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
    console.log(stream, stream.getVideoTracks());
    video.addEventListener('loadeddata', loop);
  });
});

function matchColor(detectedGesture: Event | string) {
  switch (detectedGesture) {
    case 'rock':
      return 'red';
    case 'paper':
      return 'green';
    case 'scissors':
      return 'blue';
    default:
      return 'white';
  }
}

function clearVideo() {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.restore();
  resultText.innerText = 'none';
  resultText.style.color = 'white';
  marker.style.visibility = 'hidden';
  marker.style.backgroundColor = 'white';
}

async function loop() {
  const now = Date.now();

  let result: GestureRecognizerResult = {
    landmarks: [],
    worldLandmarks: [],
    handednesses: [],
    gestures: []
  };
  let lastVideoTime = -1;

  function predict() {
    if (video.currentTime === lastVideoTime) {
      return;
    }
    lastVideoTime = video.currentTime;
    result = gestureRecognizer.recognizeForVideo(video, now);

    if (result.gestures.length <= 0) {
      clearVideo();
      return;
    }
    marker.style.visibility = 'visible';
    // console.log(result)

    const detectedGesture = result.gestures[0][0].categoryName || 'none';

    resultText.style.color = matchColor(detectedGesture);
    resultText.innerText = detectedGesture;

    marker.style.backgroundColor = matchColor(detectedGesture);

    canvas.style.height = `${video.clientHeight}px`;
    // video.style.height = videoHeight;
    canvas.style.width = `${video.clientWidth}px`;
    // video.style.width = videoWidth;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    if (result.landmarks) {
      const landmarks = result.landmarks[0];
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
        color: '#00FF00',
        lineWidth: 5
      });
      drawLandmarks(canvasCtx, landmarks, {
        color: '#FF0000',
        lineWidth: 2
      });

      const hand = landmarks.filter((_, i) => handCenter.includes(i));
      const x = hand.map((l) => l.x);
      const y = hand.map((l) => l.y);
      const [xmin, xmax] = [Math.min(...x), Math.max(...x)];
      const [ymin, ymax] = [Math.min(...y), Math.max(...y)];

      const xCenter = (xmax - xmin) / 2 + xmin;
      const yCenter = (ymax - ymin) / 2 + ymin;

      const markerX = (1 - map(xCenter, 0.1, 0.9, 0, 1)) * window.innerWidth;
      marker.style.left = `${markerX}px`;
      const markerY = map(yCenter, 0.1, 0.9, 0, 1) * window.innerHeight;
      marker.style.top = `${markerY}px`;

      updatePosition(markerX, markerY);

      const rect: NormalizedRect = {
        xCenter,
        yCenter,
        height: ymax - ymin,
        width: xmax - xmin,
        rotation: 0
      };
      const center = { ...rect, height: 0.1, width: 0.1 };
      // console.log(rect)
      drawRectangle(canvasCtx, rect, {
        fillColor: '#00000000',
        color: '#f00'
      });
      drawRectangle(canvasCtx, center, {
        fillColor: '#0000ff',
        color: '#00000000'
      });
    }
    updateGesture(detectedGesture);
    canvasCtx.restore();
  }

  predict();
  if (prediction) {
    window.requestAnimationFrame(loop);
  }
}
