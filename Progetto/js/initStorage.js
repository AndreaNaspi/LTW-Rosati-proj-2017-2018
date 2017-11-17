/**
Questa funzione deve essere eseguita onload della pagina index.html (pagina home/iniziale). Si occupa semplicemente di inizializzare l'array di object "pages" in localStorage con le pagine di esempio.

STRUTTURA ATTUALE DEL LOCAL STORAGE: (sarà aggiornata con il tempo)
	-localStorage.pages:array di Object, tali Object sono formati da un id (stringa rappresentante il titolo dell'articolo), un campo text (stringa rappresentante il testo dell'articolo) e un campo likedBy
	 contenente un array con gli id univoci degli utenti che hanno messo like a tale articolo

**/
function init()
{
    if (typeof(localStorage.pages) == "undefined") 
    {
        localStorage.pages=JSON.stringify([]);
    }
    var newPages = [{id:"HTML", likedBy:['u4'], text:"This is the html page, in the body tag you can use javascript or jquery to do some scripts. Javascript is beatiful."},
                    {id:"JavaScript", likedBy:['u1','u2'], text:"This is the javascript page, this code is write inside the html tag style. Jquery is an extension of javascript"},
                    {id:"JQuery", likedBy:['u3'], text:"This is the JQuery page."}];
    var pages = JSON.parse(localStorage.pages);
                
     if(newPages.length != pages.length)
    {
        localStorage.pages = JSON.stringify(newPages);
    }
    else
    {
        for(var i = 0; i < pages.length; i++)
        {
            if(pages[i].id != newPages[i].id || pages[i].text != newPages[i].text || pages[i].likedBy != newPages[i].likedBy)
                pages[i] = newPages[i];
        }
        localStorage.pages = JSON.stringify(pages);
    }
}