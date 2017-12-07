/**
 * JAVADOC TOP 10 LIKED:
 *  Questo script interroga il localStorage.pages ed ottiene le top 10 pagine in ordine decerescente in base al numero dei like.
 *  La lista interessata formata da 15 elementi dovrà avere id listFavorite (nel tag di dichiarazione non in tutti i sotto tag di lista).
 *  Se tale script è eseguito onLoad non preoccuparsi di nascondere gli elementi poichè gli elementi che avanzano nella lista (se le pagine sono meno di 10) saranno
 *  nascosti da me (display=none). Se si vuole solo ottenere la lista formata dai link (già generati dal codice) delle top 15 page utilizzare solo la prima parte.
 *  La seconda parte aggiorna solo la lista.
 * 
 * 
 * JAVADOC LIKED BY USER:
 *  Dato un user in input ritorna un array di address (per ora non limitato!)  già generati dallo script a cui l'utente in input ha messo like.
 **/



function top10Liked()
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

function likedByUser(user)
{
    var pages = JSON.parse(localSTorage.pages);
    pages = pages.filter(function(elem) { return elem.likedBy.indexOf(users.nickname) != -1});
    pages.map(
        function(page)
        {
            var link = document.createElement("a");
            link.innerHTML = page.id;
            link.href = "article.html?id="+"'"+page.id+"'";
            return link.outerHTMl;
        });
    return pages;
}