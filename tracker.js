(function () {
  console.log("main")
  XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (value) {
    this.addEventListener(
      "progress",
      function (value) {
        console.log("Loading. The intercept...\n", value.target.responseURL);
      },
      false
    );
    this.realSend(value);
  };

  function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.withCredentials = true;
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

  httpGetAsync("https://jsonplaceholder.typicode.com/posts/1", (data) =>
    console.log("http request done")
  );
})();
