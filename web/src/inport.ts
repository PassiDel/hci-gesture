/// <reference path="drawing_utils.d.ts" />
import '@mediapipe/drawing_utils';
import type { NormalizedRect as _NormalizedRect } from '@mediapipe/drawing_utils';
import {
  drawConnectors as _drawConnectors,
  drawLandmarks as _drawLandmarks,
  drawRectangle as _drawRectangle
} from '@mediapipe/drawing_utils';

/// <reference path="hands.d.ts" />
import '@mediapipe/hands';
import { HAND_CONNECTIONS as _HAND_CONNECTIONS } from '@mediapipe/hands';

export const drawConnectors = window.drawConnectors || _drawConnectors;
export const drawLandmarks = window.drawLandmarks || _drawLandmarks;
export const drawRectangle = window.drawRectangle || _drawRectangle;
export const HAND_CONNECTIONS = window.HAND_CONNECTIONS || _HAND_CONNECTIONS;
export type NormalizedRect = _NormalizedRect;
