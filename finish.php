<?php
include ("./header.php");

// Do form validation.
if (!isset ($_POST["accurate_intention"]) || empty ($_POST["accurate_intention"])) {
    $_SESSION["notifications"][] = "Please state if AutoComPaste is accurate " .
        "in predicting your intention.";
}

if (!isset ($_POST["less_mistakes"]) || empty ($_POST["less_mistakes"])) {
    $_SESSION["notifications"][] = "Please state if you make less mistakes " .
        "with AutoComPaste.";
}

if (!isset ($_POST["minimize_effort"]) || empty ($_POST["minimize_effort"])) {
    $_SESSION["notifications"][] = "Please state if AutoComPaste minimizes " .
        "your effort to complete the goal.";
}

if (!isset ($_POST["lesser_steps"]) || empty ($_POST["lesser_steps"])) {
    $_SESSION["notifications"][] = "Please state if AutoComPaste minimizes " .
        "the number of steps required to complete the goal.";
}

if (!isset ($_POST["enjoyment"]) || empty ($_POST["enjoyment"])) {
    $_SESSION["notifications"][] = "Please state if you enjoy using AutoComPaste.";
}

if (!isset ($_POST["easy_to_learn"]) || empty ($_POST["easy_to_learn"])) {
    $_SESSION["notifications"][] = "Please state if AutoComPaste is easy " .
        "to learn.";
}

if (isset ($_SESSION["notifications"]) &&
    is_array ($_SESSION["notifications"]) &&
    $_SESSION["notifications"] > 0) {
    $_SESSION["saved_form"] = $_POST;
    header ("Location: page3.php");
    die ();
}
?>

<div class="container">
    <h1>Experiment Complete</h1>
    <h4>Thank you for your time!</h4>
    
    <p>
        You can now leave the workstation. Please approach the
        investigator if you have any questions.
    </p>

</div>

<?php
include ("./footer.php");
?>
