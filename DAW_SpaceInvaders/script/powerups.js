/*
*	Arrays
*/
var powerups = [];//array de powerups aleatorios
var lifes = [];//array de vidas aleatorias


/*
*	Constructor de los powerups
*/
function randomObject(width, height, ruta, x, y, type){
	this.type = type;
	if(type == "image"){
		this.image = new Image();
		this.image.src = ruta;
	}
	this.width = width;
	this.height = height;
	this.y = y;
	this.x = x;
	this.show = function(){
		ctx = area.context;
		if(type == "image"){
			ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
		}
	}
	this.move = function(){
		this.y += 1;
		this.show();
	}
	this.hitJugador = function(powerup, jugador){//detecta si el powerup entra en contacto con el jugador
		if(powerup.y == jugador.y-20 && powerup.x < jugador.x + jugador.width && powerup.x > jugador.x - jugador.width){
			return true;
		}
	}
}

/*
*	Funciones y colisiones
*
*
*
*	ya que le damos valor 0 en eje y, los objetos caeran siempre desde lo alto de nuestro canvas,
*	de esta forma si creamos un número aleatorio "random" para x, los objetos nunca caerán desde la misma posición
*/
function powerup(){
//Mayora cadencia de disparo y velocidad
	var random = Math.floor(Math.random()*470);
	var cad = 0.01;
	var prob = Math.floor(Math.random()*2000);//cuanto más alto el número, más baja la probabilidad
	if(prob/100 < cad){
		var powerup = new randomObject(25,25,"img/double.png",random,0,"image");
		powerups.push(powerup);
	}
}

//colisiones
function powerupColision(){
	var sonido = true;
	for(var i = 0; i < powerups.length; i++){
		if(powerups[i].hitJugador(powerups[i],jugador)){
			if(sonido){//sonido de disparo del jugador
				powersound.play();
				powersound.currentTime = 0;
				powersound.play();
				sonido = false;
			}
			powerups.splice(i,1);
			frecuenciaDisparo = 10;//el jugador dispara mas rápido
			velocidad = 6;//la velocidad del jugador se dobla, después de 3 segundos vuelve a su estado inicial "velocidad=3"
			setTimeout(function(){frecuenciaDisparo = 60; velocidad = 3},3000);//3 segundos
		}
	}
}

/*
*	ya que le damos valor 0 en eje y, los objetos caeran siempre desde lo alto de nuestro canvas,
*	de esta forma si creamos un número aleatorio "random" para x, los objetos nunca caerán desde la misma posición
*/
function randomLife(){
	//+1 vida
	var random = Math.floor(Math.random()*470);
	var cad = 0.01;
	var prob = Math.floor(Math.random()*2000);//cuanto más alto el número, más baja la probabilidad
	if(prob/100 < cad){
		var randomLife = new randomObject(25,25,"img/life.png",random,0,"image");
		lifes.push(randomLife);
	}	
}

//colisiones
function lifeColision(){
	var sonido = true;
	for(var i = 0; i < lifes.length; i++){
		if(lifes[i].hitJugador(lifes[i],jugador)){
			if(sonido){//sonido de disparo del jugador
				heal.play();
				heal.currentTime = 0;
				heal.play();
				sonido = false;
			}
			lifes.splice(i,1);
			vidas = vidas+1;//se añade una vida al jugador
			document.getElementById("vidas").innerHTML=parseInt(document.getElementById("vidas").innerHTML,10)+1;
		}
	}
}