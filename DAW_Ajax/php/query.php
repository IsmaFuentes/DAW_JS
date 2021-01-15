<?php
    //Clase en la que realizaremos las consultas

    //incluimos la clase Database
    include("database.php");

    class Query{

        //consulta los departamentos
        public function showDepartamento(){
            //instanciamos un objeto de tipo Database() y establecemos la conexión
            $conexion = new Database();
            $conn = $conexion->getConnection();
            //realizamos la consulta
            $query = $conn->prepare("SELECT id, nombre FROM departamentos");
            $query->execute();
        
            $strHTML = "";
            $num = $query->rowCount();
            
            //construimos las opciones del selector con los datos extraidos de la consulta
            echo "<option value='' disabled selected hidden>Departamento</option>";
            for($i = 0; $i < $num; $i++) {
                $row = $query->fetch();
                $strHTML .=$row["nombre"];
                echo "<option value=".$row["id"].">".$row["nombre"]."</option>";
            }
        }

        //consultamos los puestos de trabajo
        public function showPuesto(){
            //instanciamos un objeto de tipo Database() y establecemos la conexión
            $conexion = new Database();
            $conn = $conexion->getConnection();
            //guardamos el valor de $_GET['departamento] en la variable $id
            $id = htmlspecialchars($_GET["departamento"]);
            //realizamos la consulta condicional donde $id = id_departamento
            $query = $conn->prepare("SELECT id, nombre FROM puestos WHERE id_departamento = $id");
            $query->execute();
        
            $strHTML = "";
            $numReg = $query->rowCount();

            //construimos las opciones del selector con los datos extraidos de la consulta
            echo "<option value='' disabled selected hidden>Puesto</option>";
            for($i = 0; $i < $numReg; $i++) {
                $row = $query->fetch();
                $strHTML .=$row["nombre"];
                echo "<option value=".$row["id"].">".$row["nombre"]."</option>";
            }    
        }

        //damos de alta un usuario
        public function sendValues(){
            //instanciamos un objeto de tipo Database() y establecemos la conexión
            $conexion = new Database();
            $conn = $conexion->getConnection();

            //valores de la consulta
            $id_puesto = htmlspecialchars($_POST["puesto"]);
            $nombre = htmlspecialchars($_POST["nombre"]);
            $email = htmlspecialchars($_POST["email"]);
            $tlf = htmlspecialchars($_POST["tlf"]);

            //realizamos la consulta
            $query = $conn->prepare("INSERT INTO personas (nombre,email,telefono,id_puesto) VALUES ('$nombre','$email',$tlf,$id_puesto);");
            $query->execute(); 
        }

        //convertimos los datos de la base de datos a JSON
        public function convertToJSON(){
            //instanciamos un objeto de tipo Database() y establecemos la conexión
            $conexion = new Database();
            $conn = $conexion->getConnection();

            $return_array = array();
            //guardamos el valor de $_GET['dept] en la variable $id
            $id = htmlspecialchars($_GET["dept"]);
            $consulta = "SELECT puestos.nombre as 'puesto', personas.nombre, personas.email, personas.telefono 
                         FROM personas INNER JOIN puestos ON (puestos.id = personas.id_puesto) 
                         WHERE id_departamento = '$id'";
            $query = $conn->prepare($consulta);
            
            $query->execute();

            while($row = $query->fetch(PDO::FETCH_ASSOC)){
                $row_array['nombre'] = $row['nombre'];
                $row_array['email'] = $row['email'];
                $row_array['telefono'] = $row['telefono'];
                $row_array['puesto'] = $row['puesto'];
                
                array_push($return_array,$row_array);
            }
            //se imprime la conversión del array a JSON
            echo json_encode($return_array);
        }

    }

?>  