<?php
/**
 * Created by JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 10/7/13
 * Time: 1:02 PM
 * To change this template use File | Settings | File Templates.
 */

// Process your information here

if (!empty($_POST)) {
    $user = $_POST['user'];
    //echo "hello";
} else {
    header("Location: index.php");
    /* Make sure that code below does not get executed when we redirect. */
    exit;
}

// save $user as cookie as a carry on data for the next pages
setcookie("user", $user, time()+(3600*3)); // time of expiration is 3 hours

?>
<html>
<head>
    <title>Experiment Run Template 1</title>
</head>
<body>
<div>
    <p>
        This part of the interface collects whatever pre-test information (ie demographic and all) that you need.
    </p>

</div>
<div>
    <p>Please put all information needed for: <?php echo $user; ?> </p>
    <form action="page2.php" method="post">
        <span>Information 1</span><input type="text" name="var1" /><br/>
        <span>Information 2</span><br/>
        <input type="radio" name="var2" value="1">Option 1<br/>
        <input type="radio" name="var2" value="2">Option 2<br/>
        <span>Information 3</span><br/>
        <input type="checkbox" name="var3" value="a">Option 1<br/>
        <input type="checkbox" name="var3" value="b">Option 2<br/>
        <span>Information 4</span><br/>
        <select name="var4">
            <option value="1a">Option A</option>
            <option value="2b">Option B</option>
            <option value="3c">Option C</option>
            <option value="4d">Option D</option>
        </select><br/>
        <span>Information 5</span>
        <textarea name="var5" rows="10" cols="30">
This is a information type essay
        </textarea><br/>
        <input id="submit" type="submit" value="submit">
    </form>
</div>

</body>
</html>