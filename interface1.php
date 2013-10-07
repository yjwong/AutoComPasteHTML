<?php
/**
 * Created by JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 10/7/13
 * Time: 4:13 PM
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

$user = $_COOKIE["user"];

include("testenv.html");
