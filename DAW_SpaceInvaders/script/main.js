//window onload
window.onload = function(){
	//Boton start game - inicia el canvas y sus objetos
	document.getElementById("start").onclick = function(){empezarJuego();};
	//boton help
	document.getElementById("help").onclick = function(){menuAyuda();};
	//restart
	document.getElementById("reset").onclick = function(){restart();};
	//highscores
	document.getElementById("highscores").onclick = function(){ranking();};
	//volver al menu principal desde highscores
	document.getElementById("backtomenu").onclick = function(){volverMenu();};
	//volver al menu principal - desde help
	document.getElementById("return").onclick = function(){volver();};
	//reiniciar juego - desde pantalla de victoria
	document.getElementById("startagain").onclick = function(){restart2();};
	//gestión de las cookies
	setCookies();
	//botón que guarda las cookies
	document.getElementById("savebutton").onclick = function(){enviar();};

	document.getElementById("savebutton2").onclick = function(){enviarPuntuacionFinal();};
	//botón que resetea las cookies
	document.getElementById("deletecookies").onclick = function(){removeCookies();};
}

/*
*	Recursos
*/

//Arrays
var enemigos = [];//array de enemigos
var boss = [];//array para el boss final del juego
var municion = [];//array de munición del jugador
var municionEnemigo = [];//array de munición del enemigo
var tecla = [];//array de teclas presionadas

//Intervalos
var interval;//bucle principal del juego

//varables del jugador
var jugador;//jugador
var puntos = 0;//puntuación final del jugador
var contador = 0;//contador para la frecuencia de los disparos del jugador
var vidas = 3;//vidas totales del jugador
var frecuenciaDisparo = 60;//frecuencia de disparo del jugador
var velocidad = 3;//velocidad de movimiento del jugador

//variables del enemigo
var vel = 1;//velocidad inicial del enemigo
var num = 700;//probabilidad de disparo del enemigo
var ronda = 0;//rondas
var vida = 1000;//vida del boss


/*
*	Sonidos del juego
*/

var musica = document.createElement("audio"); //musica de fondo
musica.setAttribute("src", "sounds/song.mp3"); 
musica.loop = true;
musica.volume = 0.4;

var powersound = document.createElement("audio");//powerup
powersound.setAttribute("src","sounds/power.mp3");
powersound.volume = 0.5;

var heal = document.createElement("audio");//powerup +1 vida
heal.setAttribute("src","sounds/heal.mp3");
heal.volume = 0.5;

var bossmusic = document.createElement("audio"); //musica boss
bossmusic.setAttribute("src", "sounds/song_boss.mp3"); 
bossmusic.volume = 0.4;

var laser = document.createElement("audio"); //sonido al disparar
laser.setAttribute("src", "sounds/proyectil.mp3");
laser.volume = 0.2;

var explosion = document.createElement("audio"); //sonido al disparar
explosion.setAttribute("src", "sounds/explosion.wav");
explosion.volume = 0.15;


/*
*	Navegación general (botones y demás)
*/

function menuAyuda(){
	document.getElementById("helpdiv").style.display = "inline-block";
}

function restart(){
	window.location.href = 'main.html';
}

function ranking(){
	document.getElementById("ranking").style.display="inline-block";
}

function volverMenu(){
	document.getElementById("ranking").style.display="none";
}

function volver(){
	document.getElementById("helpdiv").style.display="none";
}

function restart2(){
	location.reload();
}

function enviar(){
	document.cookie = "rango=" + puntos;
	alert("New last score saved as: "+ puntos);
}

function enviarPuntuacionFinal(){
	document.cookie = "rango=" + puntos;
	alert("New last score saved as: "+ puntos);
}


/*
*	Efectos
*	Cuando los disparos del enemigo impactan con el jugador
*	muestra un div que cubre el canvas de color rojo
*/

function redScreenEffect(){
	document.getElementById("aviso").style.display = "inline-block";
	//Esconde el div al cabo de un rato
	setTimeout(function(){document.getElementById("aviso").style.display = "none"},300);
}


/*
*	Funciones principales del juego
*/

//inicia el canvas y sus objetos
function empezarJuego(){
	//sonidos
	musica.play();
	area.start();//inicia el canvas
	jugador = new nuevoJugador(40,40,"img/fighter3.png",235,530,"image");//creamos el objeto jugador
	creaEnemigos();//creamos el grupo de enemigos

	//Escondemos los elementos del layout
	document.getElementById("start").style.display="none";
	document.getElementById("titulo").style.display="none";
	document.getElementById("highscores").style.display="none";
	document.getElementById("hide").style.display="none";
	document.getElementById("help").style.display="none";
	//Hacemos visibles los elementos del juego
	document.getElementById("score").style.display="inline-block";//Iniciamos puntuación
	document.getElementById("rounds").style.display="inline-block";//Iniciamos rondas
	document.getElementById("vida").style.display="inline-block";//vidas del jugador
	document.getElementById("vidas").innerHTML=parseInt(document.getElementById("vidas").innerHTML,10)+vidas;
}

//canvas
var area = {
	canvas : document.createElement("canvas"),
	start : function(){
		this.canvas.width = 504;
		this.canvas.height = 600;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);//insertamos el canvas en nuestro html
		//bucle principal del juego
		interval = setInterval(updateArea, 10);//Cuanto menor sea el valor, mayor la frecuencia de refresco
		//gestión de los eventos del teclado
		window.addEventListener('keydown', function (e){
			tecla[e.keyCode] = true;
			//charCode en firefox
		})
        window.addEventListener('keyup', function (e) {
            tecla[e.keyCode] = false;
        })
	},
	clear : function(){//función que sirve para borrar el canvas
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

/*
*	Enemigos y boss
*/

//Enemigos ronda 0+
function creaEnemigos(){
	for(var i = 0; i < 11; i++){
		var enemigo = new nuevoEnemigo(30,40,"img/alien.png",65+i*35,70,"image");
		enemigos.push(enemigo);
		for(var j = 0; j < 1; j++){
			var enemigo = new nuevoEnemigo(30,40,"img/alien.png",65+i*35,20,"image");
			enemigos.push(enemigo);
		}
	}
}
//Enemigos ronda 5+
function creaNuevosEnemigos(){
	for(var i = 0; i < 11; i++){
		var enemigo = new nuevoEnemigo(30,40,"img/alien2.png",65+i*35,70,"image");
		enemigos.push(enemigo);
		for(var j = 0; j < 1; j++){
			var enemigo = new nuevoEnemigo(30,40,"img/alien2.png",65+i*35,20,"image");
			enemigos.push(enemigo);
		}
	}
}

//Boss final ronda 10+
function crearBoss(){
	var bossfinal = new finalBoss(100,70,"img/finalboss.png",200,70,"image");
	boss.push(bossfinal);
}


/*
*	Detección de colisiones
*/

function colisionEnemigo(){
	sonido = true;
	var colision = false;
	for(var i = 0; i < municion.length; i++){
		//colisiones
		for(var j = 0; j < enemigos.length; j++){
			if(municion[i].hitEnemigo(municion[i], enemigos[j])){
				if(sonido){//gestiona el sonido de explosión al colisionar
					explosion.pause();
					explosion.currentTime = 0;
					explosion.play();
					sonido = false;
				}
				enemigos.splice(j,1);
				colision = true;
				var puntuacion = 16;
				document.getElementById("points").innerHTML=parseInt(document.getElementById("points").innerHTML,10)+puntuacion;
				puntos += puntuacion;
			}
		}
		//si la bala toca el tope del canvas esta se elimina
		if(municion[i].y == 0){
			municion.splice(i,1);
		}
		//si hay colision con el enemigo la bala se elimina
		if(colision == true){
			municion.splice(i,1);
		}
	}
}

function colisionBoss(){
	var colision = false;
	for(var i = 0; i < municion.length; i++){
		for(var j = 0; j < boss.length; j++){
			if(municion[i].hitEnemigo(municion[i], boss[j])){
				colision = true;
				//cada disparo resta 10 de vida al boss
				vida = vida -10;
				document.getElementById("hp").innerHTML=parseInt(document.getElementById("hp").innerHTML,10)-10;
				//cada disparo sobre el boss nos da +10 de puntuación
				var puntuacion = 10;
				document.getElementById("points").innerHTML=parseInt(document.getElementById("points").innerHTML,10)+puntuacion;
				puntos += puntuacion;
			}
			//si la vida del boss llega a 0, este muere y el jugador gana la partida
			if(vida == 0){
				boss.splice(j,1);
			}
		}
		if(colision == true){
			municion.splice(i,1);
		}
	}
}

function colisionJugador(){
	var colision = false;
	for(var i = 0; i < municionEnemigo.length; i++){
		if(municionEnemigo[i].hitJugador(municionEnemigo[i],jugador)){
			colision = true;
			vidas--;//por cada disparo recibido restamos una vida al jugador
			redScreenEffect();
			document.getElementById("vidas").innerHTML=parseInt(document.getElementById("vidas").innerHTML,10)-1;
			if(colision == true){//al impactar sobre el jugador, la bala se elimina
				municionEnemigo.splice(i,1);
			}
			if(vidas == 0){//si el jugador se queda sin vidas se termina el juego
				musica.pause();
				bossmusic.pause();
				jugador.clear();//borra al jugador
				document.getElementById("aviso").style.display = "none";//esconde el aviso que aparece cuando se resta una vida
				clearInterval(interval);//para el intervalo (el bucle principal del juego)
				area.clear();//limpiamos el canvas
				document.getElementById("lost").style.display="block";//muestra pantalla de game over!
				document.getElementById("puntos").innerHTML=parseInt(document.getElementById("puntos").innerHTML,10)+puntos;//puntuación final
			}
		}
		//si las balas tocan suelo estas se eliminan
		if(municionEnemigo[i].y == 600){
			municionEnemigo.splice(i,1);
		}
	}
}

/*
*	Gestión de rondas
*/

function gestionRondas(){
	//si todos los enemigos mueren, vuelven a aparecer con mayor velocidad y cadencia de disparo
	if(enemigos.length == 0){
		ronda++;//cada vez que el array de enemigos se vacia, se incrementa una ronda
		//enemigos tipo 1
		if(ronda < 5){
			document.getElementById("ronda").innerHTML=parseInt(document.getElementById("ronda").innerHTML,10)+1;
			num = num-25;//cadencia de disparo aumenta
			vel = vel*1.05;//velocidad de movimiento aumenta
			creaEnemigos();
		}
		//enemigos tipo 2
		if(ronda > 5 && ronda < 11 ){
			document.getElementById("ronda").innerHTML=parseInt(document.getElementById("ronda").innerHTML,10)+1;
			num = num-25;//cadencia de disparo aumenta
			vel = vel*1.05;//velocidad de movimiento aumenta
			creaNuevosEnemigos();
		}
		//boss final
		if(ronda == 11 && boss.length == 0){
			document.getElementById("ronda").innerHTML=parseInt(document.getElementById("ronda").innerHTML,10)+1;
			document.getElementById("hp").innerHTML=parseInt(document.getElementById("hp").innerHTML,10)+vida;
			document.getElementById("hitpoints").style.display="inline-block";
			musica.pause();
			bossmusic.play();
			crearBoss();
		}
	}
	if(vida == 0){//cuando el jugador vence al boss final
		clearInterval(interval);//para el intervalo (el bucle principal del juego)
		bossmusic.pause();
		document.getElementById("userwin").style.display = "inline-block";
		document.getElementById("puntosFinal").innerHTML=parseInt(document.getElementById("puntosFinal").innerHTML,10)+puntos;//puntuación final
	}
}


/*
*	Movimientos del juego
*/

function movimientosJugador(){
	jugador.speedX = 0;//velocidad inicial del jugador
	//movimientos - izquierda/derecha
	if(tecla[37]){jugador.speedX = -velocidad;}

	if(tecla[39]){jugador.speedX = velocidad;}

	jugador.move();//movimiento del jugador
	
	if(tecla[32]){//disparos del jugador
		contador++;
		//frecuencia de disparo
		if(municion.length == 0 || municion[municion.length-1].contador+frecuenciaDisparo <= contador){
			var sonido = true;
			if(sonido){//sonido de disparo del jugador
				laser.pause();
				laser.currentTime = 0;
				laser.play();
				sonido = false;
			}
			var bala = new disparo(jugador.x +18.5, jugador.y, 3, 4,contador);
			municion.push(bala);
		}
	}
}

function movimientos(){
	//enemigos
	for(var i = 0; i < enemigos.length; i++){
		enemigos[i].move();
		enemigos[i].show();	
	}
	//disparos del jugador
	for(var i = 0; i < municion.length; i++){
		municion[i].move();
	}
	//disparos del enemigo
	for(var i = 0; i < municionEnemigo.length; i++){
		municionEnemigo[i].move();
	}
	//boss final
	for(var i = 0; i < boss.length; i++){
		boss[i].move();
		boss[i].show();
	}
	//powerups aleatorios
	for(var i = 0; i < powerups.length; i++){
		powerups[i].show();
		powerups[i].move();
	}
	//vidas aleatorias
	for(var i = 0; i < lifes.length; i++){
		lifes[i].show();
		lifes[i].move();
	}
}

/*
*	loop principal del juego
*/

function updateArea(){
	area.clear();//limpia el canvas entero
	jugador.show();//muestra el jugador
	powerup();//mejora del jugador - cae de forma aleatoria durante el juego
	randomLife();//mejora del jugador - caen vidas del cielo
	movimientosJugador();//función que registra el movimiento del jugador
	movimientos();//representa el movimiento de los elementos del canvas
	colisionJugador();//dibuja los disparos del enemigo
	colisionEnemigo();//detecta las colsiones en los enemigos
	colisionBoss();//detecta las colisiones con el boss final
	powerupColision();//colision powerups
	lifeColision();//colision vidas aleatorias
	gestionRondas();//gestión de las rondas del juego
}
