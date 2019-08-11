<?php

    header("Content-type: application/json; charset=utf-8");

    function getRandomHash($n) { 
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
        $randomString = ''; 
      
        for ($i = 0; $i < $n; $i++) { 
            $index = rand(0, strlen($characters) - 1); 
            $randomString .= $characters[$index]; 
        } 
      
        return $randomString;
    } 

    $target_dir = './uploads/';
    $target_file = $target_dir.basename($_FILES["file"]["name"]);
    $fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    $fileName = $target_dir.getRandomHash(3)."-".$_FILES["file"]["name"];
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $fileName)) {
        $fh = fopen("./uploads.dat", "a");
        fwrite($fh, $_FILES["file"]["name"].":");
        fclose($fh);

        echo json_encode(["success" => true, "file" => $_FILES["file"]["name"]]);
    } else {
        echo json_encode(["success" => false, "file" => $_FILES["file"]["name"], "error" => "Nie udało się przesłać pliku"]);
    }
    