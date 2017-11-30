function updateLogin()
{
    var logged =  JSON.parse(localStorage.logged).username;
    if(logged != "")
    {
        document.getElementById("profile").style.display="";
        document.getElementById("accountName").innerHTML=logged;
        document.querySelectorAll(".button").forEach(function(value){value.style.display="none";});
        var logout = document.createElement("a");
        logout.href="";
        logout.innerHTML="<li>Logout</li>";
        logout.style="text-decoration: none;"
        logout.onclick = 
            function()
            {
                localStorage.logged=JSON.stringify({logged:false, username:""});
                document.getElementById("profile").style.display="none";      
                document.getElementById("accountName").innerHTML="Account";
                document.querySelectorAll(".button").forEach(function(value){value.style.display="";});
                logout.innerHTML="";
                logout.parentNode.removeChild(logout);                
            }
        document.getElementById("listAccount").appendChild(logout);

    }
    else return;
}