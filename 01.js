const observable = {
  subscribe: function (observer) {
    const url = "http://jsonplaceholder.typicode.com/users/1";
    const result = fetch(url).then((res) => res.json());

    function nextAndComplete(x) {
      observer.next(x);
      observer.complete();
    }

    result.then(nextAndComplete, observable.error);
  },
};

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

observable.subscribe(observer);
