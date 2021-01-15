
window.onload = function(){
	//formulario de registro
	cargarDepartamentos();
	document.getElementById("departamento").onchange = function(){cargarPuestos();}
	document.getElementById("envia").onclick = function(){enviarDatos();}
	//display de la tabla
	document.getElementById("consulta").onclick = function(){callJSON();}
	//validación de datos con expresiones regulares
	document.getElementById("nombre").onkeyup = function(){validateName();}
	document.getElementById("email").onkeyup = function(){validateEmail();}
	document.getElementById("tlf").onkeyup = function(){validatePhone();}
}

/* CONSULTAS AJAX */

//carga los departamentos
function cargarDepartamentos() {
    var rxmlhttp;
	rxmlhttp = new XMLHttpRequest();

	rxmlhttp.onreadystatechange = function() {
		if (rxmlhttp.readyState == 4 && rxmlhttp.status == 200) {
			document.getElementById("departamento").innerHTML = rxmlhttp.responseText;
		}
	}
	rxmlhttp.open("GET","http://localhost/ejercicios/Javascript/proyecto_ajax/departamentos.php",true);
	rxmlhttp.send();
}

//carga los puestos dependiendo del departamento
function cargarPuestos() {
    var rxmlhttp;
	rxmlhttp = new XMLHttpRequest();

	rxmlhttp.onreadystatechange = function() {
		if (rxmlhttp.readyState == 4 && rxmlhttp.status == 200) {
			document.getElementById("puesto").innerHTML = rxmlhttp.responseText;
		}
	}
	rxmlhttp.open("GET","http://localhost/ejercicios/Javascript/proyecto_ajax/puestos.php?departamento="+document.getElementById('departamento').value,true);
	rxmlhttp.send();
}

//Dar de alta un usuario
function enviarDatos(){
	var rxmlhttp;
	rxmlhttp = new XMLHttpRequest();

	rxmlhttp.onreadystatechange = function(){
		if(rxmlhttp.readyState == 4 && rxmlhttp.status == 200){
			alert("usuario registrado");
		}
	}
	rxmlhttp.open("POST","http://localhost/ejercicios/Javascript/proyecto_ajax/enviar.php",true);
	rxmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	rxmlhttp.send(
				"puesto="+document.getElementById('puesto').value+
				"&nombre="+document.getElementById('nombre').value+
				"&email="+document.getElementById('email').value+
				"&tlf="+document.getElementById('tlf').value
				);
}

//LLamamos al código php que construye el JSON y lo utilizamos para crear una tabla
function callJSON(){
    var rxmlhttp;
	rxmlhttp = new XMLHttpRequest();

	rxmlhttp.onreadystatechange = function() {
		if (rxmlhttp.readyState == 4 && rxmlhttp.status == 200) {
			createTable(JSON.parse(rxmlhttp.responseText));
			console.log(JSON.parse(rxmlhttp.responseText));
		}
	}	
	rxmlhttp.open("GET","http://localhost/ejercicios/Javascript/proyecto_ajax/generarJSON.php?dept="+document.getElementById('dept').value,true);
	rxmlhttp.send();
}

//crea una tabla extrayendo datos de un JSON
function createTable(json){
	var tabla = "<table class='table mt-2'>"+
					"<thead><tr>"+
						"<th>Nombre</th>"+
						"<th>Teléfono</th>"+
						"<th>Email</th>"+
						"<th>Puesto</th>"+
					"</tr></thead>";

	Object.keys(json).forEach(a =>{
		tabla+= `<tbody><tr>
					<td>${json[a].nombre}</td>
					<td>${json[a].telefono}</td>
					<td>${json[a].email}</td>
					<td>${json[a].puesto}</td>
				 </tr></tbody>`;
	});
	
	tabla+= "</table>";
	document.getElementById("tabla").innerHTML = tabla;
}

/* EXPRESIONES REGULARES - VALIDACIÓN DE DATOS */

//validar nombre
function validateName(){
	var expr = /^[a-z]+$/i;
	var nombre = document.getElementById("nombre").value;
	var validationResult = expr.test(nombre);

	if(validationResult == false){
		document.getElementById("nombre").style.color = "red";
	}else{
		document.getElementById("nombre").style.color = "black";
	};
}

//validar email
function validateEmail(){
	var expr = /^[\w\.-]+@[\w\.-]+\.\w{2,4}$/i;
	var email = document.getElementById("email").value;
	var validationResult = expr.test(email);

	if(validationResult == false){
		document.getElementById("email").style.color = "red";
	}else{
		document.getElementById("email").style.color = "black";
	}
} 

//validar teléfono
function validatePhone(){
	var expr = /^[+]?[(]?[0-9]{0,4}[)]?[0-9\s-]+$/;
	var phone = document.getElementById("tlf").value;
	var validationResult = expr.test(phone);

	if(validationResult == false){
		document.getElementById("tlf").style.color = "red";
	}else{
		document.getElementById("tlf").style.color = "black";
	}
}