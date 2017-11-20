/**
Questa funzione deve essere eseguita onload della pagina index.html (pagina home/iniziale). Si occupa semplicemente di inizializzare l'array di object "pages" in localStorage con le pagine di esempio.

STRUTTURA ATTUALE DEL LOCAL STORAGE: (sarà aggiornata con il tempo)
	-localStorage.pages:array di Object, tali Object sono formati da un id (stringa rappresentante il titolo dell'articolo), un campo text (stringa rappresentante il testo dell'articolo) e un campo likedBy
    contenente un array con gli username univoci degli utenti che hanno messo like a tale articolo
    
VERSIONE 2.0: (ricordarsi sempre di eseguire tale js on load della prima pagina)
    è stato aggiunto un nuovo indirizzo a localStorage chiamato localStorage.users contenente un array di Object.
    Tali object sono formati da username univoco, email univoca e password (hashata univocamente in initUser.js). 
    Questi dati devono essere richiesti al momento della registrazione. 
    Il login verrà eseguito tramite du campi: primo campo username/email e secondo campo password    
    
**/
function init()
{
    if (typeof(localStorage.pages) == "undefined") 
    {
        localStorage.pages=JSON.stringify([]);
    }
    if (typeof(localStorage.users) == "undefined") 
    {
        localStorage.users=JSON.stringify([{username:"admin",email:"andreanaspi@gmail.com",password:"1303378837"}]);
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
