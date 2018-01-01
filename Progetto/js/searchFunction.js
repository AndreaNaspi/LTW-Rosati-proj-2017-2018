/**
Questa prima sezione, eseguita onload dello script, aggiunge i script necessari per jquery nel tag head
**/
var head = document.getElementsByTagName("head")[0];

var linkcss = document.createElement("link");
linkcss.href = "../css/jquery-ui.css";
linkcss.rel = "stylesheet";
head.appendChild(linkcss);

var script1 = document.createElement("script");
var script2 = document.createElement("script");
script2.src = "../js/JQuery/jquery-ui.min.js";
script2.async = "async";
script2.charset = "utf-8";
head.appendChild(script2);

/**
Questa prima funzione inizializza il campo per la ricerca in modo da far funzione la finestra di autocomplete, con il giusto filter e highlight (tramite JQuery widget)
**/
function initSearchField()
{
    var pages = JSON.parse(localStorage.pages);
    var language = pages.map(function(value){return value.id;});
    //init autocomplete
    $("#search").autocomplete({
        source: language,
        focus: function (event, ui) { event.preventDefault();},
        select: function (event, ui) { eventPressEnter(event,true); }
    });

    //do search on enter click
    $("#search").keydown(function(event) {eventPressEnter(event, false);});

    //select the words to show
    $.ui.autocomplete.filter = function (array, term) 
    {
        var term = term.trim();
        var wordInitial = array.filter(function(value) {return value.toLowerCase() == term.toLowerCase();});        
        wordInitial = wordInitial.concat(array.filter(function(value) {return wordInitial.indexOf(value) == -1 && new RegExp("^"+$.ui.autocomplete.escapeRegex(encodeURIComponent(term)),"i").test(encodeURIComponent(value));}));
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
        var t = String(encodeURIComponent(item.value)).replace(new RegExp(encodeURIComponent(this.term.trim()), "gi"),"<strong style='color:#788CFF'>$&</strong>");
        return $("<li></li>")
                .data("item.autocomplete", item)
                .append("<div>" + decodeURIComponent(t) + "</div>")
                .appendTo(ul);
    };
}
/**
Questa funzione gestisce la ricerca sulla pressione dell'invio, se la pagina trovata è singola si viene reindirizzato subito ad essa, altrimenti alla pagina searchResults.html
**/
function eventPressEnter(e, bool)
{
    if (e.keyCode == 13 || bool == true) 
    {
        var searchVal = document.getElementById("search").value.trim();
        var array = JSON.parse(localStorage.pages);
        var wordInitial =  array.filter(function(value) {return value.id.toLowerCase() == searchVal.toLowerCase();});     
        wordInitial = wordInitial.concat(array.filter(function(value) {return wordInitial.indexOf(value) == -1 && new RegExp("^"+$.ui.autocomplete.escapeRegex(encodeURIComponent(searchVal)),"i").test(encodeURIComponent(value.id));}));
        var wordContains = array.filter(function(value) {return value.id.toLowerCase().indexOf(searchVal.toLowerCase()) != -1 && wordInitial.indexOf(value) == -1;});
        var resultPages = wordInitial.concat(wordContains);
        if(resultPages.length == 1)
            window.open("articolo.html?id="+"'"+resultPages[0].id+"'","_self");
        else
            window.open("searchResults.html?search="+"'"+document.getElementById("search").value+"'","_self")
    }
}

/**
Questa funzione è utilizzata in searchResults.html per inizializzare la lista di pagine trovate tramite la ricerca (valore di recerca passato tramite query string)
**/
function initSearchResults()
{
    var pages = JSON.parse(localStorage.pages);
    var queryString = decodeURIComponent(window.location.search);
    if(queryString.indexOf("?") == -1)
    {
        alert("URL non valido. Verrai riportato alla home.");
        window.open("../html/index.html","_self");                    
        return;
    }
    var searchName = queryString.replace(new RegExp("[\"\'?]","g"),"").split("=")[1].toLowerCase().trim();
    document.getElementById("searchTitle").innerHTML +="\""+searchName+"\"";

    //obtain results
    var wordInitial =  pages.filter(function(value) {return value.id.toLowerCase() == searchName.toLowerCase();});         
    wordInitial = wordInitial.concat(pages.filter(function(value) {return (wordInitial.indexOf(value) == -1) && (new RegExp("^"+searchName,"i").test(value.id));}));
    var wordContains = pages.filter(function(value) {return value.id.toLowerCase().indexOf(searchName.toLowerCase()) != -1 && wordInitial.indexOf(value) == -1;});
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