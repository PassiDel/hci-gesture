document.addEventListener('hand:rock', (e) => {
  const { target, state, new: isNew } = e.detail;
  if (!target || !state || !isNew || !target.classList.contains('clickable')) {
    return;
  }

  // click a button
  target.click();
  target.style.backgroundColor = 'green';
  setTimeout(() => {
    target.style.backgroundColor = '';
  }, 100);
});

let draggable: HTMLButtonElement | null = null;
document.addEventListener('hand:rock', (e) => {
  const { state, target } = e.detail;
  if (state && target && target.classList.contains('draggable')) {
    draggable = target;
  }
});
document.addEventListener('hand', (e) => {
  const { x, y, type } = e.detail;
  if (!draggable) {
    return;
  }
  draggable.style.top = `${y}px`;
  draggable.style.left = `${x}px`;
  if (type === 'none') {
    draggable = null;
  }
});
