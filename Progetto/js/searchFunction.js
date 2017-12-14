//import script for the autocomplete
var head = document.getElementsByTagName("head")[0];

var linkcss = document.createElement("link");
linkcss.href = "../css/jquery-ui.css";
linkcss.rel = "stylesheet";
head.appendChild(linkcss);

var script1 = document.createElement("script");
var script2 = document.createElement("script");
script1.src = "JQuery/jquery-3.2.1.min.js"; script2.src = "JQuery/jquery-ui.min.js";
script1.async = "async"; script2.async = "async";
script1.charset = "utf-8"; script2.charset = "utf-8";
head.appendChild(script1); head.appendChild(script2);

//inizializzazione search
function initSearchField()
{
    var language = JSON.parse(localStorage.pages).map(function(value){return value.id;});

    //init autocomplete
    $("#search").autocomplete({
        source: language,
        focus: function (event, ui) { event.preventDefault();}
    });

    //select the words to show
    $.ui.autocomplete.filter = function (array, term) 
    {
        var wordInitial = array.filter(function(value) {return new RegExp("^"+$.ui.autocomplete.escapeRegex(term),"i").test(value);});
        var wordContains = array.filter(function(value) {return value.toLowerCase().indexOf(term) != -1 && wordInitial.indexOf(value) == -1;});
        return wordInitial.concat(wordContains);
    };

    //resize to parent width
    $.ui.autocomplete.prototype._resizeMenu = function () 
    {
        var ul = this.menu.element;
        ul.outerWidth(this.element.outerWidth());
    }

    //highlight the selected words
    $.ui.autocomplete.prototype._renderItem = function (ul, item) 
    {        
        var t = String(item.value).replace(new RegExp(this.term, "gi"),"<strong style='color:#788CFF'>$&</strong>");
        return $("<li></li>")
                .data("item.autocomplete", item)
                .append("<div>" + t + "</div>")
                .appendTo(ul);
    };
}