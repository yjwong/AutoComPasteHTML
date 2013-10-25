<?php
/**
 * Created by JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 10/7/13
 * Time: 8:10 PM
 * To change this template use File | Settings | File Templates.
 */

if (!empty($_POST)) {
    $value = $_POST["data"];
    $interface = $_POST["interface"];
    //setcookie($interface, $data, time()+(3600*3));
    //echo "hello";
} else {
    header("Location: index.php");
    /* Make sure that code below does not get executed when we redirect. */
    exit;
}
$File = $interface.".txt";

header("Content-Disposition: attachment; filename=\"" . basename($File) . "\"");
header("Content-Type: application/force-download");
header("Connection: close");

$realdata = "";

//var_dump($_POST);
//var_dump($_COOKIE);

if (strcmp("acp", $interface)==0) {
    $data = json_decode($value, true);

    foreach ($data["data"] as $k => $v) {
        $text = "";
        $val = $v["data"];
        foreach ($val as $x=> $y) {
            if (is_array($y)) {
                foreach ($y as $w) {
                    $text = $text.$w."; ";
                }
            } else {
                $word = str_replace("\n", "", str_replace("\r", "", $y));
                $text = $text.$word."; ";
            }
        }
        $realdata = $realdata.$text."\n";
    }

} elseif (strcmp("xwindow", $interface)==0){
    $data = json_decode($value, true);
    $text = "";
    foreach ($data["data"] as $k => $v) {
        $text = "";
        $val = $v["data"];
        foreach ($val as $x=> $y) {
            if (is_array($y)) {
                foreach ($y as $w) {
                    $text = $text.$w."; ";
                }
            } else {
                $word = str_replace("\n", "", str_replace("\r", "", $y));
                $text = $text.$word."; ";
            }
        }
        $realdata = $realdata.$text."\n";
    }
}

echo $realdata;

