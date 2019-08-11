<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>UPLOAD | jaroslawlesniak.pl</title>
    <link rel="stylesheet" href="css/app.css">
    <link rel="stylesheet" href="css/fontello.css">
    <link rel="shortcut icon" href="./img/favicon.png" type="image/png">
</head>
<body>
    <main>
        <div class="container">
            <div id="drop-area">
                <form class="upload">
                    <i class="icon-upload-cloud"></i>
                    <input type="file" id="fileElem" multiple name="file" onchange="handleFiles(this.files)">
                    <label class="button" for="fileElem">Wybierz pliki</label> albo przeciągnij je na stronę
                </form>
                <div class="progress"></div>
                <div class="background">
                    <div>Upuść pliki, żeby je przesłać</div>
                </div>
            </div>
        </div>
        <div class="menu-btn">
            <i class="icon-menu"></i>
            <span class="amount" title="Liczba przesłanych plików">0</span>
        </div>
        <div class="menu">
            <h1>Ostatnio przesłane pliki<i class="icon-cancel hide-btn"></i></h1>
            <ul>
                <?php

                    $data = explode(":", file_get_contents("./uploads.dat"));

                    for($i = count($data) - 1; $i >= 0; $i--) {
                        echo "<li>".$data[$i]."</li>";
                    }
                ?>
            </ul>
        </div>
    </main>
    <script src="js/app.js"></script>
</body>
</html>