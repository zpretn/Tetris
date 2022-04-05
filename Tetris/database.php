<?php
include_once 'database.inc';


$SQL = "INSERT INTO tbl (lastname, forname)VALUES ('$lastname', '$fname')";
echo $SQL;
$conn->query($SQL);
/*** Anzeigen 
foreach ($conn->query($SQL) as $row) {
    echo "lastname: " . $row['lastname'] . " ";
    echo "forname: " . $row['forname'] . "<br>";

}
 **/
