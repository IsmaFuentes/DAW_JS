<?php
    //Clase con la que realizaremos la conexión
    class Database{

        //variables de conexión
        private $host = "localhost";
        private $db_name = "entorn_client";
        private $username = "root";
        private $password = "";
        public $conn;

        public function getConnection(){
            $this->conn = null;

            try {
                $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
                $this->conn->query("set names 'utf8'");
            } catch (PDOException $exception) {
                echo "Connection error: " . $exception->getMessage();
            }

            return $this->conn;
        }
    }

?>