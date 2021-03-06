<?php
ob_start ();

// Precompile all LESS files before serving them to the client.
require ("./vendor/less.php/lessc.inc.php");

$less = new lessc;
$less->setFormatter ("classic");
$less->compileFile ("./vendor/bootstrap/less/bootstrap.less", "./vendor/bootstrap/dist/css/bootstrap.css");

// Initialize sessions.
if (isset ($_GET["sid"]) && !empty ($_GET["sid"])) {
    session_id ($_GET["sid"]);
}

$result = session_start ();
if (!$result) {
    die ("Unable to start session.");
}

$session_id = session_id ();

// Create form data if it exists.
if (isset ($_SESSION["saved_form"])) {
    $saved_form = $_SESSION["saved_form"];
    unset ($_SESSION["saved_form"]);
}

// Define convenience functions.
function get_experiments () {
    // Check if the participant is registered.
    $experiments_json = file_get_contents ("data/experiments.json");
    $experiments = json_decode ($experiments_json);

    return $experiments;
}

function participant_id_check () {
    // Check if participant ID is defined.
    if (!isset ($_SESSION["participant_id"])) {
        $_SESSION["notifications"][] = "No participant ID specified.";
        header ("Location: index.php");
        die ();
    }

    $experiments = get_experiments ();
    if (!property_exists ($experiments, $_SESSION["participant_id"])) {
        $_SESSION["notifications"][] = "Participant ID is not valid.";
        header ("Location: index.php");
        die ();
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>AutoComPaste Experiment</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- CSS files -->
    <link rel="stylesheet" href="vendor/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans" />
    <link rel="stylesheet" href="css/main.css" />

    <!-- JavaScript -->
    <script src="js/jquery-1.11.1.min.js"></script>
    <script src="js/main.js"></script>

    <script src="js/window_manager.js"></script>
    <script src="js/autocompaste/engine.js"></script>
    <script src="js/autocompaste/interface.js"></script>
    <script src="js/autocompaste/editor.js"></script>
    <script src="js/autocompaste/autocompaste.js"></script>
</head>
<body>
    <?php
    if (isset ($_SESSION["notifications"]) &&
        is_array ($_SESSION["notifications"]) &&
        $_SESSION["notifications"] > 0) {
        echo "<div id=\"notifications\">\n";

        echo "<div class=\"notification\">\n";
        foreach ($_SESSION["notifications"] as $notification) {
            echo $notification;
            echo "<br />";
            echo "\n";
        }
        echo "</div>\n";

        echo "</div>\n";
        unset ($_SESSION["notifications"]);
    }
    ?>

    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="navbar-header">
            <a class="navbar-brand" href="index.php">AutoComPaste Experiment</a>
        </div>
        <p class="navbar-text pull-right">CS4249 Phenomena and Theories of Human-Computer Interaction</small>
    </nav>

