<?php
/**
 * Created by JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 10/7/13
 * Time: 3:45 PM
 * To change this template use File | Settings | File Templates.
 */

// Process your information here

if (!empty($_POST)) {
    $demodata = $_POST;
    foreach ($_POST as $key => $value) {
        setcookie("demodata_".$key, $value, time()+(3600*3));
    }

    //echo "hello";
} else {
    header("Location: index.php");
    /* Make sure that code below does not get executed when we redirect. */
    exit;
}

if (!isset($_COOKIE["user"])){
    $message = "Please use a username";
    header("Location: index.php?message=".$message);
    exit;
}

$user = $_COOKIE["user"];
?>

<html>
<head>
    <title>Experiment Run Template 1</title>
</head>
<body>
<div>
    <p>
This part of the interface makes you choose which Interface do you want to do first. You can also modify this to make it automatic (i.e. depending on the id number, they would do ACP first
        then XWindow second, or vice-versa...
    </p>

</div>
<div>
    <p>What should <?php echo $user; ?> do first?</p>
<form action="page3.php" method="post">

    <span>Interface</span><br/>
    <input type="radio" name="interface" value="acp">ACP<br/>
    <input type="radio" name="interface" value="xwindow">XWindow<br/>
    <input id="submit" type="submit" value="submit">
</form>
</div>

</body>
</html>