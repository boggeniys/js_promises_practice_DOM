'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let leftClick = false;

  document.addEventListener('click', () => {
    leftClick = true;
    resolve();
  });

  setTimeout(() => {
    if (!leftClick) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

function firstResolve() {
  const div = document.createElement('div');

  div.className = 'success';
  div.setAttribute('data-qa', 'notification');
  div.textContent = 'First promise was resolved';

  document.body.append(div);
}

function firstReject() {
  const div = document.createElement('div');

  div.className = 'error';
  div.setAttribute('data-qa', 'notification');
  div.textContent = 'First promise was rejected';

  document.body.append(div);
}

function secondResolve() {
  const div = document.createElement('div');

  div.className = 'success';
  div.setAttribute('data-qa', 'notification');
  div.textContent = 'Second promise was resolved';

  document.body.append(div);
}

function thirdResolve() {
  const div = document.createElement('div');

  div.className = 'success';
  div.setAttribute('data-qa', 'notification');
  div.textContent = 'Third promise was resolved';

  document.body.append(div);
}

firstPromise.then(firstResolve).catch(firstReject);
secondPromise.then(secondResolve);
thirdPromise.then(thirdResolve);
