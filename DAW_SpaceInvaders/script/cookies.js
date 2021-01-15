/*
*	Gestuón de cookies
*/
function setCookies(){
	var array = document.cookie.split('; ');
	var cookieName;
	var cookieValue;
	var temp;

	for(var i = 0; i < array.length; i++){
		temp = array[i].split('=');
		cookieName = temp[0];
		cookieValue = temp[1];
		for(var i = 0; i < array.length; i++){
			if(cookieName == "rango"){
			document.getElementById("lista").innerHTML+="<li>"+"Last score: "+cookieValue+"</li>";
			}
		}
	}
}

/*
*	función que elimina las cookies / Elimina nuestra última puntuación
*/
function removeCookies(){
	var res = document.cookie;
	var cookies = res.split(";");
	for(var i = 0; i < cookies.length; i++){
		var key = cookies[i].split("=");
		document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
		//refresco de la página - los cambios no son visibles al instante
		location.reload();
	}
}
