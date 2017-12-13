/**
 * JAVADOC TOP 10 LIKED:
 *  Questo script interroga il localStorage.pages ed ottiene le top 10 pagine in ordine decerescente in base al numero dei like.
 *  La lista interessata formata da 15 elementi dovrà avere id listFavorite (nel tag di dichiarazione non in tutti i sotto tag di lista).
 *  Se tale script è eseguito onLoad non preoccuparsi di nascondere gli elementi poichè gli elementi che avanzano nella lista (se le pagine sono meno di 10) saranno
 *  nascosti da me (display=none). Se si vuole solo ottenere la lista formata dai link (già generati dal codice) delle top 15 page utilizzare solo la prima parte.
 *  La seconda parte aggiorna solo la lista.
 * 
 * 
 * JAVADOC recentArticles:
 *  Inizializza lo spazio di recent articles nella home con gli ultimi 5 articoli caricati (in ordine), con possibilità di mostrare più articoli se numero articolo > 5 nella pagina 
    articoliRecenti.html 
**/

function initTop10Liked()
{
    var pages = JSON.parse(localStorage.pages);
    pages.sort(function(a,b) { return a.likedBy.length - b.likedBy.length;}).reverse();
    pages = pages.slice(0,10);
    
    //seconda parte
    var index = document.querySelectorAll('.likeNumber');
    var images = document.querySelectorAll('.likeImage');
    var text = document.querySelectorAll('.likeText');
    var counter = 0;
    for(var i = 0; i < 5; i++)
    {
        var actualIndex = i;
        //set left element
        index[actualIndex].innerHTML += (counter+1)+")";
        images[actualIndex].src = pages[actualIndex].src;
        var paragraph = document.createElement("p");
        //create title link
        var link = document.createElement("a");
        link.href= "articolo.html?id="+"'"+pages[actualIndex].id+"'";
        link.innerHTML+= pages[actualIndex].id;
        paragraph.innerHTML+= link.outerHTML;
        //append first 10 word to appendices
        paragraph.innerHTML+= ": "+pages[actualIndex].text.split('.')[0]+"...";
        text[actualIndex].appendChild(paragraph);      
        
        var actualIndex = i+5;
        //set right element
        index[actualIndex].innerHTML += (counter+2)+")";
        images[actualIndex].src = pages[actualIndex].src;
        var paragraph = document.createElement("p");
        //create title link
        var link = document.createElement("a");
        link.href= "articolo.html?id="+"'"+pages[actualIndex].id+"'";
        link.innerHTML+= pages[actualIndex].id;
        paragraph.innerHTML+= link.outerHTML;
        //append first 10 word to appendices
        paragraph.innerHTML+= ": "+pages[actualIndex].text.split('.')[0]+"...";
        text[actualIndex].appendChild(paragraph);
        
        counter+=2;
    }

}
function initRecentArticles()
{
    var images = document.querySelectorAll('.recentImage');
    var text = document.querySelectorAll('.recentText');
    var pages = JSON.parse(localStorage.pages).reverse();
    for(var i = 0; i < 5; i++)
    {
        images[i].src = pages[i].src;
        var paragraph = document.createElement("p");
        var link = document.createElement("a");
        link.href= "articolo.html?id="+"'"+pages[i].id+"'";
        link.innerHTML+= pages[i].id;
        paragraph.innerHTML+= link.outerHTML;
        paragraph.innerHTML+= ": "+pages[i].text.split('.')[0]+"...";
        text[i].appendChild(paragraph);   
    }
    if(pages.length > 5)
    {
        var section = document.getElementById("sezione1");
        var paragraph = document.createElement("p");
        var button = document.createElement("input");
        button.type= "button"; 
        button.value= "Mostra altro"; 
        button.style= "width:250px; height:60px; font-size:25px; margin-left: 35px; margin-bottom:20px;"
        button.onclick= function () { window.open('mostraAltro.html','_self'); };
        section.appendChild(paragraph.appendChild(button));
    }

}