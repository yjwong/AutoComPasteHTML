<?php
/**
 * Created by JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 10/7/13
 * Time: 8:10 PM
 * To change this template use File | Settings | File Templates.
 */

if (!empty($_POST)) {
    $data = $_POST["data"];
    $interface = $_POST["interface"];
    setcookie($interface, $data, time()+(3600*3));
    //echo "hello";
} else {
    header("Location: index.php");
    /* Make sure that code below does not get executed when we redirect. */
    exit;
}