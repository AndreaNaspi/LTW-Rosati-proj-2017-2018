//funzione per gestire la modifica di username e email tramite il button
function activeButton(elem)
{
    if(elem.value == "Modifica")
    {
        elem.value = "Salva";
        if(elem.id == "modificaUsername")
        {
            var text = document.getElementById("username");
            text.placeholder = "Nuovo username";
            text.value= "";
            text.disabled = "";
        }
        if(elem.id == "modificaEmail")
        {
            var text = document.getElementById("email");
            text.placeholder = "Nuova email";
            text.value= "";
            text.disabled = "";
        }
    }
    else if(elem.value == "Salva")
    {
        //update local storage with new info
        var users = JSON.parse(localStorage.users);
        var oldUsername = JSON.parse(localStorage.logged).username;
        for(var i = 0; i < users.length; i++)
        {
            if(users[i].username == oldUsername)
            {
                if(elem.id == "modificaUsername")
                {
                    users.push({username:document.getElementById("username").value, email:users[i].email, password:users[i].password.toString()});
                    users.splice(i,1);
                    document.getElementById("username").disabled = "disabled";
                    localStorage.users = JSON.stringify(users);
                    localStorage.logged=JSON.stringify({logged:true, username:document.getElementById("username").value});
                }
                else
                {
                    if(!(document.getElementById("email").checkValidity()))
                    {
                        alert("Inserire un indirizzo email valido.");
                        return;
                    }
                    users.push({username:users[i].username, email:document.getElementById("email").value, password:users[i].password.toString()});
                    users.splice(i,1);
                    document.getElementById("email").disabled = "disabled";
                    localStorage.users = JSON.stringify(users);
                }
                break;
            }
        }
        window.location.reload(); 
    }
}
//funzione per gestire la modifica della password (hashPassword from initUser)
function modificaPassword(elem)
{
    var text1 = document.getElementById("oldPassword");
    var text2 = document.getElementById("newPassword");
    if(elem.value == "Modifica")
    {
        elem.value = "Salva";
        text1.placeholder = "Vecchia password"; text2.placeholder="Nuova password (min 8 caratteri)";
        text1.disabled = ""; text2.disabled = "";
    }
    else if(elem.value == "Salva")
    {
        //update local storage with new info
        var users = JSON.parse(localStorage.users);
        var hash1 = hashPassword(text1.value);
        var hash2 = hashPassword(text2.value);
        for(var i = 0; i < users.length; i++)
        {
            if(users[i].password == hash1)
            {
                if(text2.value.length < 8 )
                {
                    alert("La password deve essere minimo di 8 caratteri");
                    return;
                }
                users.push({username:users[i].username, email:users[i].email, password:hash2.toString()});
                users.splice(i,1);
                localStorage.users = JSON.stringify(users);
                alert("Password modificato con successo!");
                window.location.reload();
                return;
            }
        }
        alert("Vecchia password sbagliata");
    }
}
//funzione per inizializzare le informazioni utente
function initUserInformation()
{
    var logged = JSON.parse(localStorage.logged);
    var user = JSON.parse(localStorage.users).filter(function(value){return value.username == logged.username;})[0];
    document.getElementById("username").value = user.username;
    document.getElementById("email").value = user.email;
}
//funzione per inizializzare le pagine che piacciono all'utente
function initLikedByUser()
{
    var pages = JSON.parse(localStorage.pages);
    var actualUser = JSON.parse(localStorage.logged).username;
    pages = pages.filter(function(value) {return value.likedBy.indexOf(actualUser) != -1;})
    if(pages.length == 0)
    {
        document.getElementById("text").innerHTML += "<p>"+"Non ti piace nessuna pagina :C"+"</p>";
        return;
    }
    var list = document.getElementById("likedByUser");
    list.style.display = "";
    for(var i = 0; i < pages.length; i++)
    {
        var element = document.createElement("li");
        var link = document.createElement("a");
        link.href = "articolo.html?id="+"'"+pages[i].id+"'";
        link.innerHTML = pages[i].id;
        element.appendChild(link);
        element.style.marginBottom="5px";
        list.appendChild(element);
    }
}