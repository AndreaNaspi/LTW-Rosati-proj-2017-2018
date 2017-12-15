//import script for the autocomplete
var head = document.getElementsByTagName("head")[0];
var pages = JSON.parse(localStorage.pages);
var language = pages.map(function(value){return value.id;});

var linkcss = document.createElement("link");
linkcss.href = "../css/jquery-ui.css";
linkcss.rel = "stylesheet";
head.appendChild(linkcss);

var script1 = document.createElement("script");
var script2 = document.createElement("script");
script1.src = "../js/JQuery/jquery-3.2.1.min.js"; script2.src = "../js/JQuery/jquery-ui.min.js";
script1.async = "async"; script2.async = "async";
script1.charset = "utf-8"; script2.charset = "utf-8";
head.appendChild(script1); head.appendChild(script2);

//inizializzazione search
function initSearchField()
{
    //init autocomplete
    $("#search").autocomplete({
        source: language,
        focus: function (event, ui) { event.preventDefault();}
    });

    //do search on enter click
    $("#search").keydown(function(event) {eventPressEnter(event);});

    //select the words to show
    $.ui.autocomplete.filter = function (array, term) 
    {
        var wordInitial = array.filter(function(value) {return new RegExp("^"+$.ui.autocomplete.escapeRegex(encodeURIComponent(term)),"i").test(encodeURIComponent(value));});
        var wordContains = array.filter(function(value) {return value.toLowerCase().indexOf(term.toLowerCase()) != -1 && wordInitial.indexOf(value) == -1;});
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
        var t = String(encodeURIComponent(item.value)).replace(new RegExp(encodeURIComponent(this.term), "gi"),"<strong style='color:#788CFF'>$&</strong>");
        return $("<li></li>")
                .data("item.autocomplete", item)
                .append("<div>" + decodeURIComponent(t) + "</div>")
                .appendTo(ul);
    };
}
//do search on enter click
function eventPressEnter(e)
{
    if (e.keyCode == 13) 
    {
        var searchVal = document.getElementById("search").value;
        var resultPages = JSON.parse(localStorage.pages).filter(function(value){return new RegExp("^"+$.ui.autocomplete.escapeRegex(encodeURIComponent(searchVal)),"i").test(encodeURIComponent(value.id));});
        if(resultPages.length == 1)
            window.open("articolo.html?id="+"'"+resultPages[0].id+"'","_self");
        else
            window.open("searchResults.html?search="+"'"+document.getElementById("search").value+"'","_self")
    }
}

//funzione utilizzata solo nella pagina searchResults.html per inizializzare i risultati ottenuti dalla ricerca dalla query string generata in eventPressEnter
function initSearchResults()
{
    var queryString = decodeURIComponent(window.location.search);
    if(queryString.indexOf("?") == -1)
    {
        alert("URL non valido. Verrai riportato alla home.");
        window.open("../html/index.html","_self");                    
        return;
    }
    var searchName = queryString.replace(new RegExp("[\"\'?]","g"),"").split("=")[1];
    document.getElementById("searchTitle").innerHTML +="\""+searchName+"\"";

    //obtain results
    var wordInitial = pages.filter(function(value) {return new RegExp("^"+$.ui.autocomplete.escapeRegex(searchName),"i").test(value.id);});
    var wordContains = pages.filter(function(value) {return value.id.toLowerCase().indexOf(searchName) != -1 && wordInitial.indexOf(value) == -1;});
    var resultsPages = wordInitial.concat(wordContains);
    var listResults = document.getElementById("searchResults");
    if(resultsPages.length == 0)
    {
        listResults.innerHTML += "<p>"+"<strong>Nessuna pagina trovata.</strong>"+"</p>";
        return;
    }
    for(var i = 0; i < resultsPages.length; i++)
    {
        var paragraph = document.createElement("p");
        var link = document.createElement("a");
        link.href= "articolo.html?id="+"'"+resultsPages[i].id+"'";
        link.innerHTML+= resultsPages[i].id;
        paragraph.appendChild(link);
        paragraph.innerHTML += ": "+resultsPages[i].text.split('.')[0]+"...";
        //add the paragraph to the list
        var listElement = document.createElement("li");
        listElement.appendChild(paragraph);
        listElement.style.marginBottom="5px";
        listResults.appendChild(listElement);
    }
}