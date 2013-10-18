<?php
/**
 * Created by JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 10/7/13
 * Time: 8:12 PM
 * To change this template use File | Settings | File Templates.
 */

// This automatically sets you to go do the second interface
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

if (!isset($_COOKIE["acp"])) {

}

// checks if first interface was already tested (and subsequently, second interface)
if (isset($_COOKIE["done1"])){
    header("Location: page5.php");
    exit;
}

// sets cookie that first interface was already tested
setcookie("done1", "true", time()+(3600*3));

header("Location: page3.php");