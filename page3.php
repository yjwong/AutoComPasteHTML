<?php
/**
 * Created by JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 10/7/13
 * Time: 3:59 PM
 * To change this template use File | Settings | File Templates.
 */

if (!isset ($_COOKIE["interface"])) {
    if (!empty($_POST)) {
        $interface = $_POST["interface"];
        setcookie("interface", $interface, time()+(3600*3));
        //echo "hello";
    } else {
        header("Location: index.php");
        /* Make sure that code below does not get executed when we redirect. */
        exit;
    }
} else {
    $interface = $_COOKIE["interface"];
    if (strcmp($interface, "acp")==0) {
        $interface = "xwindow";
    } else {
        $interface = "acp";
    }
}

if (!isset($_COOKIE["user"])){
    $message = "Please use a username";
    header("Location: index.php?message=".$message);
    exit;
}

$user = $_COOKIE["user"];

if (strcmp($interface, "acp")==0) {
    $msg = "This is the instruction when using AutoComPaste Interface";
    $acpflag = "true";
} else {
    $msg = "This is the instruction when using XWindow Interface";
    $acpflag = "false";
}

require_once("external_files.php");

?>
<html>
<head>
    <title>Experiment Run Template 1</title>
</head>
<body>
<div>
    <p>
        There should always be an instruction before doing the actual evaluation of the interface.
    </p>
    <p>
       <?php echo $msg; ?>
    </p>
    <form action="interface1.php?user=<?php echo $user; ?>&acp=<?php echo $acpflag; ?>&data=<?php echo $data; ?>&jslist=<?php echo $jslist; ?>&tasklist=<?php echo $tasklist; ?>" method="post">
        <input id="submit" type="submit" value="start">
    </form>
</div>


</body>
</html>
