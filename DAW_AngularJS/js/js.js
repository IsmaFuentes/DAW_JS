
var app = angular.module("playlist", []); 

app.controller("myCtrl", function($scope, $http) {

    $scope.selectedList = null;
    //JSON canciones
	$http.get("http://localhost/ejercicios/Angular_practica/musica.php").then(function(response){
		$scope.music = response.data.canciones;
	});
    
    //JSON playlist
    $http.get("http://localhost/ejercicios/Angular_practica/playlist1.php").then(function(response){
        $scope.playlists = response.data.playlist;
    });

    //playlist seleccionada
    $scope.selectedOption = function(){
        $scope.selectedList = $scope.selected;
    }

    //añadir canciones a la playlist
    $scope.addSong = function(x){
        var repetida = false;
        $scope.selectedList.Canciones.forEach(e => {
            if(e.id == x.id){
                repetida = true;
            }
        });
        if(!repetida){
            $scope.selectedList.Canciones.push(x);
            $scope.updateCanciones();
            $scope.updateDuration();
        }
        
    }

    //crear nueva playlist
    $scope.newPlaylist = function(){
        //id del ultimo elemento del array
        var nextId = $scope.playlists[$scope.playlists.length-1].id+1;

        $scope.playlists.push({
            id: nextId,
            Nombre: $scope.nuevaPlaylist,
            Duracion: 0,
            N_canciones: 0,
            Canciones: []
        });

        $scope.nuevaPlaylist = "";
        document.getElementById("miPlaylist").focus();

    }

    //remueve las canciones de la playlist
    $scope.removeItem = function(x){
        $scope.errortext = "";    
        $scope.selectedList.Canciones.splice(x, 1);
        console.log($scope.selectedList.Canciones);
        $scope.updateCanciones();
        $scope.updateDuration();
    }
    //actualiza el total de canciones de la playlists
    $scope.updateCanciones = function(){
        $scope.selectedList.N_canciones = $scope.selectedList.Canciones.length;
    }
    //actualiza la duración total de la playlist
    $scope.updateDuration = function(){
        $scope.selectedList.Duracion = 0;

        $scope.selectedList.Canciones.forEach(e =>{
            $scope.selectedList.Duracion += e.Duracion;
        });
    }


    var pagesShown = 1;
    var pageSize = 5;
    //limite de canciones que se muestran
    $scope.limite = function() {
        return pageSize * pagesShown;
    };
    //muestra más canciones
    $scope.mostrarMas = function() {
        pagesShown = pagesShown + 1;         
    };
    //muestra menos canciones
    $scope.mostrarMenos = function(){
        pagesShown = pagesShown - 1;
    }
});

    /* No la uso... en un principio para añadir nuevas canciones
    $scope.addItem = function(){
        $scope.errortext = "";
        if(!$scope.addMe) {return;}
        //console.log($scope.music);
        var nextId = $scope.music[$scope.music.length-1].id+1;

        $scope.music.push({
            id: nextId,
            Nombre: $scope.addMe,
            Autor: " ",
            Genero: " ",
            Duracion: 130
        });
    }*/