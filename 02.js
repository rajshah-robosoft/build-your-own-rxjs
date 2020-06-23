const observer = {
  next: function (x) {
    console.log(x);
  },
  error: function (error) {
    console.log(error);
  },
  complete: function () {
    console.log("done");
  },
};

function createObservable(subscribe) {
  return {
    subscribe,
    pipe: function (operator) {
      return operator(this);
    },
  };
}

const numberObservable = createObservable(function (observer) {
  [10, 20, 30, 40].forEach(function (x) {
    observer.next(x);
  });
  observer.complete();
});

const clickObsevable = createObservable(function (observer) {
  document.addEventListener("click", function (ev) {
    observer.next(ev);
  });
});

function map(f) {
  return (inputObservable) =>
    createObservable(function (outputObserver) {
      inputObservable.subscribe({
        next: (x) => {
          const y = f(x);
          outputObserver.next(y);
        },
        error: (err) => {
          outputObserver.error(err);
        },
        complete: () => {
          outputObserver.complete();
        },
      });
    });
}

function filter(f) {
  return (inputObservable) =>
    createObservable(function (outputObserver) {
      inputObservable.subscribe({
        next: (x) => {
          if (f(x)) {
            outputObserver.next(x);
          }
        },
        error: (err) => {
          outputObserver.error(err);
        },
        complete: () => {
          outputObserver.complete();
        },
      });
    });
}

// numberObservable
//   .pipe(map((x) => x * 10))
//   .pipe(filter((x) => x !== 200))
//   .subscribe(observer);

clickObsevable
  .pipe(map((ev) => [ev.clientX, ev.clientY]))
  .pipe(filter(([x, y]) => x < 200 && y < 200))
  .subscribe(observer);
