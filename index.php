<?php
/**
 * Created by JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 10/7/13
 * Time: 11:32 AM
 * To change this template use File | Settings | File Templates.
 */

?>
<html>
<head>
    <title>Experiment Run Template 1</title>
</head>
<body>
    <div>
        <p>
            The startup interface provides the basic instructions to your participants,
            and also collect input from the participant/experimenter
            the participant ID so that you can generate the correct data log for a particular experiment session.
        </p>
        <p>
            This is a template. Please write your participant number ID given by your experimenter:
        </p>
    </div>
    <div>
        <form action="page1.php" method="post">
            <span>Participant ID:</span><input type="text" name="user" />
            <input id="submit" type="submit" value="start">
        </form>
    </div>

</body>
</html>