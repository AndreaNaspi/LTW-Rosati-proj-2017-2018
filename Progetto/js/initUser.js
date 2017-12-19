/**
 *  La funzione register deve essere eseguita onSubmit della form di registrazione ed esegue i controlli necessari  validare la registrazione
 *  e, se tutto è andato bene (return true), inserisce i dati dell'utente in localStorage.users (vedere initStorage per la struttura).
 *  Vedere sempre initStorage per la struttura di localStorage.users (username,email e password hashata) in modo da comprendere al meglio
 *  l'utilizzo di register.
 *  La funzione verrà modularizzata per semplicità nelle seguenti sottofunzioni:
 *      -checkUniqueUsername   
 *      -checkUniqueEmail
 *      -hashPassword 
 *  Alla fine del file è presenta la funzione login che ottenendo i dati dai due campi di login (username/email con id "nick" e password con id "pass") 
 *  esegue il check se l'utente indicato è registrato o no al servizio. Tale funzione va eseguita on sumbit della form di login.
 **/
function register()
{
    //getter dei tre campi html obbligatori, cambiare gli id in base alla struttura html
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    
    var users = JSON.parse(localStorage.users);

    if(!(checkUniqueUsername(username,users)))
    {
        alert("Username già registrato!");
        return false;
    }

    if(!(checkUniqueEmail(email, users)))
    {
        alert("Email già registrata!");
        return false;
    }

    var hash = hashPassword(pass);

    //add the data in localStorage.users
    users.push({username:username, email:email, password:hash});
    localStorage.users = JSON.stringify(users);
    alert("Registrazione effettuata con successo!");
    window.open("../html/login.html","_self");
    return false;
}

function checkUniqueUsername(value, users)
{
    return users.filter(function(elem) {return value==elem.username;}).length == 0;
}

function checkUniqueEmail(value, users)
{
    return users.filter(function(elem) {return value==elem.email;}).length == 0;
}

function hashPassword(value)
{
    var hash=0, chr;
    if (value.length == 0) return hash;
    for(var i = 0; i < value.length; i++)
    {
        chr = value.charCodeAt(i);
        hash = hash*31+chr;
        hash |= 0; //convert to 32 bit integer
    }   
    return hash;
}

function login()
{
    //getter dei due campi obbligatori, cambiare gli id base alla struttura html
    var value1 = document.getElementById("nick").value;
    var pass = hashPassword(document.getElementById("pass").value);
    var ret = JSON.parse(localStorage.users).filter(function(elem) {return (elem.username == value1 ) && (elem.password == pass);}).length;
    if(ret == 0)
    {
        alert("Utente non registrato o password errata");
        return false;
    }
    else if(ret == 1)
    {
        alert("Login effettuato con successo! Bentornato "+value1+".");
        localStorage.logged=JSON.stringify({logged:true, username:value1});
        return true;
    }
    else if(ret > 1)
    {
        alert("Errore inaspettato. Verrai reindirizzato alla pagina iniziale.");
        window.open("../html/index.html","_self");
        return false;
    }
}