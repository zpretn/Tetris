<?php

include_once 'database.inc';
$name = $_POST['name'];
// $number = $_POST['score'];


// print_r($_POST);



$SQL = "INSERT INTO player (playerName)VALUES ('$name')";
$SQL = "SELECT DISTINCT * from player";
$conn->query($SQL);
// echo $SQL;


/*** Anzeigen 
foreach ($conn->query($SQL) as $row) {
    echo "lastname: " . $row['lastname'] . " ";
    echo "forname: " . $row['forname'] . "<br>";

}
 **/
