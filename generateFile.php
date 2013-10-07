<?php
/**
 * Created by JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 10/7/13
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

if (!isset($_COOKIE["user"])){
    $message = "Please use a username";
    header("Location: index.php?message=".$message);
    exit;
}

if (!isset($_COOKIE["interface"])){
    $message = "Interface is not set";
    header("Location: index.php?message=".$message);
    exit;
}

$prelimdata = "Preliminary Data\n";
$realdata = "\n\nRaw Test Data\n";
foreach ($_COOKIE as $key=>$value) {

    if (strcmp("acp", $key)==0) {
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

    } elseif (strcmp("xwindow", $key)==0){
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
        //$realdata = $realdata.$text."\n";
    } elseif (strcmp("interface", $key)==0) {

    } else {
        $prelimdata = $prelimdata.trim($value).";";
    }
}

$somecontent = $prelimdata.$realdata;


$File = "result.txt";

header("Content-Disposition: attachment; filename=\"" . basename($File) . "\"");
header("Content-Type: application/force-download");
header("Connection: close");

echo $somecontent;
