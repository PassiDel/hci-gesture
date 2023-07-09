export interface EventData {
  x: number;
  y: number;
  // true=start, false=end
  state: boolean;
  new: boolean;
  type: Event;
  target?: HTMLButtonElement;
}

export type HandEvent = CustomEvent<EventData>;
declare global {
  interface GlobalEventHandlersEventMap {
    hand: HandEvent;
    'hand:rock': HandEvent;
    'hand:paper': HandEvent;
    'hand:scissors': HandEvent;
    'hand:none': HandEvent;
  }
}

export type Event = 'none' | 'paper' | 'rock' | 'scissors';

// @ts-ignore
let lastPosition = { x: 0, y: 0 };
let lastGesture: Event = 'none';
let position = { x: 0, y: 0 };
let gesture: Event = 'none';

export function updateGesture(newGesture: string) {
  gesture = newGesture as Event;
}

export function updatePosition(x: number, y: number) {
  position = { x, y };
  emitEvent();
  rollover();
}

function emitEvent() {
  const isNew = gesture !== lastGesture;

  let target: HTMLButtonElement | undefined = undefined;
  const elements = document.elementsFromPoint(position.x, position.y);
  if (
    // elements[0] is the marker itself
    elements.length > 1 &&
    elements[1] instanceof HTMLButtonElement
  ) {
    target = elements[1];
  }
  const data = { ...position, target };

  if (isNew) {
    document.dispatchEvent(
      new CustomEvent<EventData>(`hand:${lastGesture}`, {
        detail: { ...data, type: lastGesture, state: false, new: false }
      })
    );
    document.dispatchEvent(
      new CustomEvent<EventData>(`hand:${gesture}`, {
        detail: { ...data, type: gesture, state: true, new: true }
      })
    );
  }

  document.dispatchEvent(
    new CustomEvent<EventData>('hand', {
      detail: { ...data, type: gesture, state: true, new: isNew }
    })
  );
}

function rollover() {
  lastPosition = { ...position };
  lastGesture = gesture;
}

// document.addEventListener('hand', (e) => console.warn(e.detail));
['paper', 'none', 'rock', 'scissors'].forEach((n) =>
  document.addEventListener(`hand:${n}`, (e) => {
    const detail = (e as HandEvent).detail;
    if (detail.state) console.log(n, detail);
  })
);

// allow mouse drag
const dragButtons = document.getElementsByClassName(
  'drag'
) as HTMLCollectionOf<HTMLButtonElement>;

for (let dragButton of dragButtons) {
  dragButton.addEventListener('dragend', (e) => {
    dragButton.style.top = `${e.y}px`;
    dragButton.style.left = `${e.x}px`;
  });
}
