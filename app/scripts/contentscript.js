var search = "text to search";

console.log('\'Allo \'Allo! Content script');

/*
* Copyright (c) 2011 The Chromium Authors. All rights reserved.
* Use of this source code is governed by a BSD-style license that can be
* found in the LICENSE file.
*/

/**
 * Performs an XMLHttpRequest to Twitter's API to get trending topics.
 *
 * @param callback Function If the response from fetching url has a
 *     HTTP status of 200, this function is called with a JSON decoded
 *     response.  Otherwise, this function is called with null.
 */
function fetchTwitterFeed(callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(data) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        callback(null);
      }
    }
  }
  // Note that any URL fetched here must be matched by a permission in
  // the manifest.json file!

  var url = 'https://wiki.ugent.be/rest/searchv3/1.0/search?queryString=' + encodeURIComponent(search);
  xhr.open('GET', url, true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.setRequestHeader("Accept","application/json");
  xhr.send();
};

/**
 * Parses text from Twitter's API and generates a bar with trending topics at
 * the top of the current page
 *
 * @param data Object JSON decoded response.  Null if the request failed.
 */
function onText(data) {
  // Only render the bar if the data is parsed into a format we recognize.
  if (data.results) {
    // Create the overlay at the top of the page and fill it with data.

    var results_dom = document.getElementById('google_search_tab');
    var title_dom = document.createElement('strong');
    title_dom.innerHTML = '<p>Topics currently resulting on wiki:</p>';
    results_dom.appendChild(title_dom);
    //for (var id in data.results) {
      for (var i=0,result; result = data.results[i]; i++) {
        var link_dom = document.createElement('a');
        link_dom.setAttribute('href', "https://wiki.ugent.be" + result.url);

        link_dom.innerHTML =  '<p>'+ cleanUpString(result.title) + ':' + cleanUpString(result.bodyTextHighlights) + '</p>';
        link_dom.style.color = '#000';
        results_dom.appendChild(document.createTextNode(' '));
        results_dom.appendChild(link_dom);
      }
  }
};

String.prototype.replaceAll = function(str1, str2, ignore) 
{
  return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

function cleanUpString(result){
        var hightlightStart = result.replaceAll("@@@hl@@@", "<b>");
        var hightlightEnd = hightlightStart.replaceAll("@@@endhl@@@", "</b>");
        var cleanUp = hightlightEnd.replaceAll(". .", "");
        return cleanUp;
}




$(document).bind('DOMNodeInserted', function(e) {
    var element = e.target;
    if ($(element).attr('id') && "ires" === element.id && $('#google_search_tab').length == 0) {

        reloadResults();
         // fetchTwitterFeed(onText);
    }

});



function reloadResults() {
    var innersearch = $("input[name=q]:first").val();
    if ($('#google_search_tab').length == 0) {
         var addGoogleSearchTabe = $("<div  id='google_search_tab'  class='col' style='width: 456px; height: 263px;display: block;margin-left: 712px;'></div>")
        $("#rhscol").after(addGoogleSearchTabe);
             fetchTwitterFeed(onText);   
    } else {
        $('#google_search_tab').html("")
         fetchTwitterFeed(onText);
        
    }
    search = innersearch;
    console.log("reloaded");
    console.log(innersearch);

}


$("input[name=q]:first").change(function e() {

    var innersearch = $("input[name=q]:first").val();
    if ($('#google_search_tab').length == 0 || search != innersearch) {
        reloadResults();
    }
}

);



$("#ires").change(function e() {

    var innersearch = $("input[name=q]:first").val();
    if ($('#google_search_tab').length == 0 || search != innersearch) {
        reloadResults();
    }
}

);

$(document).ready(function() {


    reloadResults();

}
);
console.log('got here');