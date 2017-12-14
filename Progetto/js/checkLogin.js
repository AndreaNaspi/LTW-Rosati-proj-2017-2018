function updateLoginStatus()
{
    var logged =  JSON.parse(localStorage.logged).username;
    if(logged != "")
    {
        document.getElementById("profile").style.display="";
        document.getElementById("contribute").style.display="";
        document.getElementById("accountName").innerHTML=logged;
        document.querySelectorAll(".button").forEach(function(value){value.style.display="none";});
        var logout = document.createElement("a");
        logout.href="";
        logout.innerHTML="Logout";
        logout.style="text-decoration: none; color: #788CFF;"
        setSearchPosition(true);
        logout.onclick = 
            function()
            {
                localStorage.logged=JSON.stringify({logged:false, username:""});
                document.getElementById("profile").style.display="none";      
                document.getElementById("accountName").innerHTML="Account";
                document.querySelectorAll(".button").forEach(function(value){value.style.display="";});
                logout.innerHTML="";
                setSearchPosition(false);
                logout.parentNode.removeChild(logout);
                if(document.title.toLowerCase().indexOf("profilo") != -1)
                    window.open("index.html","_self");                
            }
        document.getElementsByClassName("dropdown-content")[0].appendChild(logout);
    }
    else return;
}

function setSearchPosition(bool)
{
    if(bool == true)
    {
        var css = '.dropdown:hover{height: 62px;}';
        if(document.getElementsByTagName('style')[0] == undefined)
        {
            var style = document.createElement('style');
            style.appendChild(document.createTextNode(css));
            document.getElementsByTagName('head')[0].appendChild(style);
        }
        else
            document.getElementsByTagName('style')[0].innerHTML+=css;
    }
    else
    {
        var css = '.dropdown:hover{height: 86px;}';
        if(document.getElementsByTagName('style')[0] == undefined)
        {
            var style = document.createElement('style');
            style.appendChild(document.createTextNode(css));
            document.getElementsByTagName('head')[0].appendChild(style);
        }
        else
            document.getElementsByTagName('style')[0].innerHTML+=css;
    }
}