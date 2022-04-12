<?php

include_once 'database.inc';
$name = $_POST['name'];
$rank = $_POST['rank'];
$number = $_POST['number'];




$SQL = "INSERT INTO player (playerName)VALUES ('$name')";
$SQL = "INSERT INTO ranking (rankingNumber)VALUES ('$rank')";
$SQL = "INSERT INTO score (scoreNumber)VALUES ('$number')";
echo $SQL;
$conn->query($SQL);
/*** Anzeigen 
foreach ($conn->query($SQL) as $row) {
    echo "lastname: " . $row['lastname'] . " ";
    echo "forname: " . $row['forname'] . "<br>";

}
 **/
