var id, text;
var otherData;
/**
Funzione chiamata onLoad della page. Questo script tramite una query string del tipo article.html?id=nomePagina (obbligatoria se si è sicuri di linkare alla pagina "nomePagina", in altri casi la genero io) 
genera in modo dinamico tale pagina html con i valori di nomePagina interrogando il local storage. In questo caso aggiorno solo il campo testo, facilmente estendibile a una possibile immagine rappresentativa dell'articolo (va aggiunta al local storage!!!).
L'id della query string deve essere uguale all'id del local storage (vedere struttura del local storage in initStorage), non case sensitive bastano i caratteri. 
Una volta analizzata la query string e trovati l'id corrispondente in local storage aggiorno il campo div (id=text obbligatorio per il campo html che conterrà il testo) con il testo corrispondente.
**/
function initPage()
{
    //inizializzo i due campi a stringa vuota
    id = ""; text="";
    otherData=[];

    //controllo se il local storage delle pagine è stato definito
    if (typeof(localStorage.pages) == "undefined" || localStorage.pages.length == 0) 
    {
        alert("Il sito è in manutenzione! Verrai riportato alla home.");
        window.open("../html/index.html","_self");
        return;
    }

    //analizzo la query string per ottenere id ed altri dati facoltativi
    var queryString = decodeURIComponent(window.location.search);
    if(queryString.indexOf("?") == -1)
    {
        alert("URL non valido. Verrai riportato alla home.");
        window.open("../html/index.html","_self");                    
        return;
    }
    queryString.replace(new RegExp("[\"\'?]","g"),"").split("&").forEach(
    function(value)
    {
        var actualValue = value.split("=");
        if(actualValue.length > 2)
        {
            alert("Url non valido. Verrai riportato alla home.");
            window.open("../html/index.html","_self");                        
            return;
        }
        if(actualValue[0] == "id") 
            id = actualValue[1];
        else
            otherData.push({objectName:actualValue[0],value:actualValue[1]});
    });

    //se non è stato trovato l'id corrispondente alla pagina significa che la pagina non è presente in memoria    
    if(id=="")                
    {
        alert("Pagina non presente sul sito. Verrai riportato alla home.");
        window.open("../html/index.html","_self");                    
        return;
    }

    //ottengo il testo della pagina dall'id della query string
    var pages = JSON.parse(localStorage.pages);
    for(var i = 0; i < pages.length; i++)
    {
        if(pages[i].id.toLowerCase() == id.toLowerCase())
        {
            text = pages[i].text;
            document.getElementById("title").innerHTML+=pages[i].id;
            document.getElementById("title").style.display = "";
            document.getElementById("articleText").innerHTML+=text;
            document.getElementById("articleText").style.display = "";
            document.getElementById("articleImage").src = pages[i].src;
            document.getElementById("articleImage").style.display = "";
            document.getElementById("like").style.display= "";
            break;
        }
    }

    if(text == "")
    {
        alert("Pagina non disponibile al momento. Verrai riportato alla home.");
        window.open("../html/index.html","_self");                    
        return;
    }
    parser();

}
/**
Funzione chiamata dopo aver aggiornato in modo dinamico il testo della pagina (quindi deve essere chiamata onload MA DOPO la prima funzione). 
Tale funzione analizza le pagine salvate in local storage e se trova una pagina che ha almeno un riferimento (non case sensitive) nel testo dell'articolo. Quel
riferimento (SOLO LA PRIMA OCCORRENZA) diverrà un link (tag <a>) sempre alla pagina article.html ma con query string rappresentate l'id del riferimento.
Esempio: se nel testo ho la parola "javascript" e nel local storage  ho l'articolo "JavaScript" la parola "javascript" diverrà
un link ad article.html con query string "?id=javascript" (query string sempre generata dal metodo in modo dinamico). 
**/
function parser()
{
    if(text == "")
        return;

    var textLower = text.toLowerCase();
    var words = textLower.split(" ").map(function(value){return value.replace(new RegExp("[\.\,\;\:\/]","g"),"")});
    var pagesInText = JSON.parse(localStorage.pages).filter(
        function(page)
        {
            if(page.id.toLowerCase() != id.toLowerCase() && words.indexOf(page.id.toLowerCase()) != -1) return true;
            return false;
        });

    //setting the tags in text
    textLower = text.split(" ");
    for(var i = 0; i < pagesInText.length; i++)
    {
        var link = document.createElement("a");   
        link.innerHTML=pagesInText[i].id;
        link.href="articolo.html?id="+"'"+pagesInText[i].id+"'";
        for(var j = 0; j < textLower.length; j++)
        {
            var actualWord = textLower[j].replace(new RegExp("[\'\"\.\,\;\:\/]","g"),"");

            if(new RegExp("^"+pagesInText[i].id+"+$","i").test(actualWord))
            {
                textLower[j] = textLower[j].replace(new RegExp(pagesInText[i].id,"i"),link.outerHTML);
                break;
            }
        }
    }
    text = textLower.join(" ");

    document.getElementById("articleText").innerHTML = text;
}