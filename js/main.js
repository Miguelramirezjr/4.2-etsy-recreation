/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=tacos&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });

      // OR

      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/
var etsyUrl = 'https://api.etsy.com/v2/listings/active.js?api_key=uze6mb6hwotb2gzkjjibfuus&keywords=tacos&includes=Images,Shop';

function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

fetchJSONP(etsyUrl, function(response) {
    console.log(response);
    var items = response.results;
    items.forEach(displayItem);
});

function displayItem(item) {
  var source = document.querySelector('#item-template').innerHTML;

  var template = Handlebars.compile(source);
  var outputHTML = template(item);

  var itemsUl = document.querySelector('.items');
  itemsUl.insertAdjacentHTML('beforeend', outputHTML);
}
