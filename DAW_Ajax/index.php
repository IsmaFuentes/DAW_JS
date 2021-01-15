<!DOCTYPE html>

<html>

    <head>
        <meta charset="UTF-8">
        <title>Ajax</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" media="screen" href="css/styles.css">
        <script src="js/js.js"></script>
    </head>

    <body>
        <form method="POST" id="formulario">
            Departamento: 
            <select id="departamento" name="departamento"></select>
            <br><br>
            Puesto: <select id="puesto" name="puesto"></select>
            <br><br>
            Nombre: <input type="text" id="nombre" name="nombre">
            <br><br>
            E-Mail: <input type="text" id="email" name="email">
            <br><br>
            Teléfono: <input type="text" id="tlf" name="tlf">
        </form>
        <br>
        <button id="envia">Envia</button>
    </body>

</html>
