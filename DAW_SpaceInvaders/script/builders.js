
/*
*	Jugador
*	Enemigo
*	Boss Final
*/

//Constructor del jugador
function nuevoJugador(width, height, ruta, x, y, type){
	this.type = type;//trata si el objeto es de tipo imagen
	if(type == "image"){
		this.image = new Image();
		this.image.src = ruta;
	}
	this.width = width;//tamaños del jugador
	this.height = height;
	this.speedX = 0;//velocidad de movimiento eje x (movimiento lateral)
	this.x = x;//eje x
	this.y = y;// eje y
	this.show = function(){//muestra el jugador
		ctx = area.context;
		if(type == "image"){//gestiona si es de tipo imágen
			ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
		}
	}
	this.clear = function(){//función que sirve para borrar al jugador
		ctx.clearRect(this.x, this.y, this.width, this.height);
	}
	this.move = function(){//movimiento del jugador
		this.x += this.speedX;//eje x - movimiento lateral
		//mantiene al jugador dentro del canvas
		if(this.x <= 0){//tope izquierdo
			this.x = 0;
		}
		if(this.x >= 464){//tope derecho
			this.x = 464;
		}
	}
}

//Constructor del enemigo
function nuevoEnemigo(width, height,ruta,x,y,type){
	this.type = type;//trata si el objeto es de tipo imágen
	if(type == "image"){
		this.image = new Image();
		this.image.src = ruta;
	}
	this.x = x;//eje x
	this.y = y;//eje y
	this.width = width;//tamaños del enemigo
	this.height = height;
	this.speedX = 0;//velocidad de movimiento eje x
	this.speedY = 1;//velocidad de movimiento eje y
	//el grupo de enemigos cae hasta una cierta posición para luego mantener un movimiento en lateral
	this.bordeIzquierdo = this.x -65;
	this.bordeDerecho = this.x +30;//
	this.bordeInferior = this.y +130;
	this.show = function(){//muestra el enemigo
		ctx = area.context;
		if(type == "image"){//gestiona si es de tipo imágen
			ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
		}
	}
	this.move = function(){
		this.x += this.speedX;
		this.y += this.speedY;
		if(this.x <= this.bordeIzquierdo){//movimiento izquierda
			this.speedX = vel;
		}
		else if(this.x >= this.bordeDerecho + this.width){//movimiento derecha
			this.speedX = -vel;
		}
		else if(this.y >= this.bordeInferior){//los enemigos caen 
			this.speedY = 0;
			this.y -= 5;
			this.speedX = -vel;
		}
		//El enemigo dispara aleatoriamente mientras se mueve
		var cadenciaDisparo = 0.02;
		//devuelve un numero random entre 1 y el valor de num
		probabilidad = Math.floor(Math.random()*num);
		if(probabilidad/100 < cadenciaDisparo){
			var balaEnemigo = new disparoEnemigo(this.x+15,this.y+15, 3, 4);
			municionEnemigo.push(balaEnemigo);
		}
	}
}

//Constructor del boss final
function finalBoss(width, height,ruta,x,y,type){
	this.type = type;//trata si el objeto es de tipo imágen
	if(type == "image"){
		this.image = new Image();
		this.image.src = ruta;
	}
	this.x = x;//eje x
	this.y = y;//eje y
	this.width = width;//dimensiones del boss
	this.height = height;
	this.speedX = 0;//velocidad de movimiento eje x
	this.speedY = 1;//velocidad de movimiento eje y
	//el boss cae hasta una cierta posición para luego mantener un movimiento en lateral
	this.bordeIzquierdo = this.x -130;
	this.bordeDerecho = this.x +30;
	this.bordeInferior = this.y +130;
	this.show = function(){//muestra el enemigo
		ctx = area.context;
		if(type == "image"){//gestiona si es de tipo imágen
			ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
		}
	}
	this.move = function(){//movimiento del boss
		this.x += this.speedX;
		this.y += this.speedY;
		if(this.x <= this.bordeIzquierdo){//movimiento izquierda
			this.speedX = 1.25;
		}
		else if(this.x >= this.bordeDerecho + this.width){//movimiento derecha
			this.speedX = -1.25;
		}
		else if(this.y >= this.bordeInferior){//boss cae del cielo
			this.speedY = 0;
			this.y -= 5;
			this.speedX = -1;
		}
		//Disparo aleatorio
		var cadenciaDisparo = 0.02;
		//devuelve un numero random entre 1 y 20
		probabilidad = Math.floor(Math.random()*20);
		if (probabilidad/100 < cadenciaDisparo) {
			var balaEnemigo = new disparoEnemigo(this.x+50,this.y+15,3,6);
			municionEnemigo.push(balaEnemigo);
		}
	}
}


/*
*	Disparos del jugador
*	Disparos del enemigo
*/

//Constructor disparos del jugador
function disparo(x,y,width,height,contador){
	ctx = area.context;
	this.contador = contador;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.show = function(){
		ctx.fillStyle = "yellow";
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
	this.move = function(){//movimiento del disparo
		this.y -= 5;//velocidad disparo
		this.show();
	}
	this.hitEnemigo = function(disparo, enemigo){//detecta si la bala entra en contacto con el enemigo
		if(disparo.y < enemigo.y + enemigo.height && disparo.x < enemigo.x + enemigo.width && disparo.x > enemigo.x){
			return true;
		}
	}
}

//Constructor disparos del enemigo
function disparoEnemigo(x,y,width,height){
	ctx = area.context;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.show = function(){
		ctx.fillStyle = "red";
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
	this.move = function(){//movimiento del disparo
		this.y -= -1;//como la velocidad es negativa dispara en dirección opuesta (hacia el jugador)
		this.show();
	}
	this.hitJugador = function(disparo, jugador){//detecta si la bala entra en contacto con el jugador
		if(disparo.y == jugador.y + jugador.height-30 && disparo.x < jugador.x + jugador.width && disparo.x > jugador.x){
			return true;
		}
	}
}