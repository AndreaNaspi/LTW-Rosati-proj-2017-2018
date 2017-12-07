/**
Questa funzione deve essere eseguita onload della pagina index.html (pagina index/iniziale). Si occupa semplicemente di inizializzare l'array di object "pages" in localStorage con le pagine di esempio.

STRUTTURA ATTUALE DEL LOCAL STORAGE: (sarà aggiornata con il tempo)
	-localStorage.pages:array di Object, tali Object sono formati da un id (stringa rappresentante il titolo dell'articolo), un campo text (stringa rappresentante il testo dell'articolo) e un campo likedBy
    contenente un array con gli username univoci degli utenti che hanno messo like a tale articolo
    
STRUTTURA VERSIONE 2.0: (ricordarsi sempre di eseguire tale js on load della prima pagina)
    è stato aggiunto un nuovo indirizzo a localStorage chiamato localStorage.users contenente un array di Object.
    Tali object sono formati da username univoco, email univoca e password (hashata univocamente in initUser.js). 
    Questi dati devono essere richiesti al momento della registrazione. 
    Il login verrà eseguito tramite du campi: primo campo username/email e secondo campo password   

STRUTTURA VERSIONE 3.0:
    è stato aggiunto un nuovo indirizzo a localStorage chiamato localStorage.login che contiene due valori: logged (booleano) e username
    è stato aggiunto un nuovo object a localstorage.pages chiamato src per linkare all'immagine rappresentativa dell'articolo
**/

function init()
{
    if (typeof(localStorage.pages) == "undefined") 
    {
        localStorage.pages=JSON.stringify([]);
    }
    if (typeof(localStorage.users) == "undefined") 
    {
        localStorage.users=JSON.stringify([{username:"admin",email:"admintechwiki@gmail.com",password:"1303378837"}]);
    }
    
    localStorage.logged=JSON.stringify({logged:false, username:""});
    

    var newPages = [{id:"HTML", src:"../assets/articleImage/html.jpg", likedBy:[], text:"In informatica html (HTML; traduzione letterale: linguaggio a marcatori per ipertesti) è un linguaggio di markup. Nato per la formattazione e impaginazione di documenti ipertestuali disponibili nel web 1.0, oggi è utilizzato principalmente per il disaccoppiamento della struttura logica di una pagina web (definita appunto dal markup) e la sua rappresentazione, gestita tramite gli stili CSS per adattarsi alle nuove esigenze di comunicazione e pubblicazione all'interno di Internet."},
                    {id:"JavaScript", src:"../assets/articleImage/Javascript.jpg", likedBy:[], text:"In informatica JavaScript è un linguaggio di scripting orientato agli oggetti e agli eventi, comunemente utilizzato nella programmazione Web lato client per la creazione, in siti Web e applicazioni web, di effetti dinamici interattivi tramite funzioni di script invocate da eventi innescati a loro volta in vari modi dall'utente sulla pagina web in uso (mouse, tastiera, caricamento della pagina ecc...)."},
                    {id:"HTML5", src:"../assets/articleImage/html5.png", likedBy:[], text:"L’HTML5 è un linguaggio di markup per la strutturazione delle pagine web, pubblicato come W3C Recommendation da ottobre 2014.<h2>Storia</h2>Lo sviluppo venne avviato dal gruppo di lavoro Web Hypertext Application Technology Working Group (WHATWG) (fondato nel 2004 da sviluppatori appartenenti ad Apple, Mozilla  Foundation ed Opera Software) che si pose come obiettivo quello di progettare delle specifiche per lo sviluppo di applicazioni web, focalizzandosi su miglioramenti e aggiunte ad HTML e alle tecnologie correlate."},
                    {id:"Java", src:"../assets/articleImage/java.png", likedBy:[], text:"In informatica Java è un linguaggio di programmazione ad alto livello, orientato agli oggetti e a tipizzazione statica, specificatamente progettato per essere il più possibile indipendente dalla piattaforma di esecuzione.<h2>Storia</h2>Java è stato creato a partire da ricerche effettuate alla Stanford University agli inizi degli anni novanta. Nel 1992 nasce il linguaggio Oak (in italiano ‘quercia’), prodotto da Sun Microsystems e realizzato da un gruppo di esperti sviluppatori capitanati da James Gosling Tale nome fu successivamente cambiato in Java per problemi di copyright (il linguaggio di programmazione Oak esisteva già)."},
                    {id:"Ajax", src:"../assets/articleImage/ajax.jpg", likedBy:[], text:"In informatica AJAX, acronimo di Asynchronous javascript and XML, è una tecnica di sviluppo software per la realizzazione di applicazioni web interattive. Lo sviluppo di applicazioni HTML con AJAX si basa su uno scambio di dati in background fra web browser e server, che consente l'aggiornamento dinamico di una pagina web senza esplicito ricaricamento da parte dell'utente. AJAX è asincrono nel senso che i dati extra sono richiesti al server e caricati in background senza interferire con il comportamento della pagina esistente. Normalmente le funzioni richiamate sono scritte con il linguaggio JavaScript. Tuttavia, e a dispetto del nome, l'uso di JavaScript e di XML non è obbligatorio, come non è detto che le richieste di caricamento debbano essere necessariamente asincrone."},
                    {id:"XML", src:"../assets/articleImage/xml.jpg", likedBy:[], text:"In informatica XML è un metalinguaggio per la definizione di linguaggi di markup, ovvero un linguaggio marcatore basato su un meccanismo sintattico che consente di definire e controllare il significato degli elementi contenuti in un documento o in un testo.Costituisce il tentativo di produrre una versione semplificata di Standard Generalized Markup Language (SGML) che consente di definire nuovi linguaggi di markup. "},
                    {id:"CSS", src:"../assets/articleImage/css.jpg", likedBy:[], text:"Il CSS (acronimo di Cascading Style Scheets in italiano fogli di stile a cascata), in informatica, è un linguaggio usato per definire la formattazione di documenti HTML, XHTML e XML ad esempio i siti web e relative pagine web. Le regole per comporre il CSS sono contenute in un insieme di direttive (Recommendations) emanate a partire dal 1996 dal W3C.L'introduzione del CSS si è resa necessaria per separare i contenuti delle pagine HTML dalla loro formattazione e permettere una programmazione più chiara e facile da utilizzare, sia per gli autori delle pagine stesse sia per gli utenti, garantendo contemporaneamente anche il riutilizzo del codice ed una sua più facile manutenzione."},
                    {id:"JQuery", src:"../assets/articleImage/jquery.png", likedBy:[], text:"jQuery è una libreria JavaScript per applicazione web. Nasce con l'obiettivo di semplificare la selezione, la manipolazione, la gestione degli eventi e l'animazione di elementi DOM in pagine HTML, nonché implementare funzionalità AJAX.È un software libero, distribuito sotto i termini della licenza MIT."},
                    {id:"Python", src:"../assets/articleImage/python.jpg", likedBy:[], text:"Python è un linguaggio di programmazione ad alto livello, orientato agli oggetti, adatto, tra gli altri usi, per sviluppare applicazioni distribuite, scripting, computazione numerica e system testing.Fu ideato da Guido Van Rossum all'inizio degli anni novanta. Il nome fu scelto per via della passione di van Rossum per i Monty Phitone per la loro serie televisiva Monty Python’s Circus. Python è spesso paragonato a Ruby, Tcl, Perl, Java, JavaScript, Visual Basic o Scheme."},
                    {id:"C++", src:"../assets/articleImage/c++.jpg", likedBy:[], text:"Il C++ è un linguaggio di programmazione orientato agli oggetti, con tipizzazione statica. È stato sviluppato (in origine col nome di ‘C con classi’) da Bjarne Stroustrup ai Bell Labs nel 1983 come un miglioramento del linguaggio C. Tra i miglioramenti principali troviamo: l'introduzione del paradigma di programmazione a oggetti, funzioni virtuali, overloading degli operatori, ereditarietà multipla, template e gestione delle eccezioni."}];
    var pages = JSON.parse(localStorage.pages);
                
    if(newPages.length != pages.length || newPages != pages)
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