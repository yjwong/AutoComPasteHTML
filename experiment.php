<?php
include ("./header.php");
participant_id_check ();

$experiments = get_experiments ();
$participant = $experiments->$_SESSION["participant_id"];
$experiments = $participant->experiments;
if (!isset ($_SESSION["experiment_step"])) {
    $_SESSION["experiment_step"] = 0;

} else {
    // Check if experiment data is valid.
    if (isset ($_POST["experiment_raw"]) && 
        isset ($_POST["experiment_time"]) && !empty ($_POST["experiment_time"])) {
        // Experiment data is good at this point.
        $_SESSION["experiment_results"][$_SESSION["experiment_step"]] = $_POST;
        $_SESSION["experiment_step"]++;
    }

    if (($_SESSION["experiment_step"]) % 9 == 0 &&
        ($_SESSION["experiment_step"]) < count ($experiments) &&
        isset ($_SESSION["experiment_resume_from_rest"]) && !$_SESSION["experiment_resume_from_rest"]) {
        // Is it time for a rest?
        $_SESSION["experiment_resume_from_rest"] = true;
        header ("Location: rest.php");
        die ();

    } else {
        $_SESSION["experiment_resume_from_rest"] = false;
    }
       
}

// At this stage the experiment is over.
if ($_SESSION["experiment_step"] >= count ($experiments)) {
    header ("Location: page3.php");
    die ();
}

// Set the title.
$experiment_title = "Round " . ($_SESSION["experiment_step"] + 1) . " of " .
    count ($participant->experiments);
$experiment = $experiments[$_SESSION["experiment_step"]];

// Set the instructions.
if ($experiment->technique == "autocompaste") {
    $experiment_instruction = "Use AutoComPaste to copy and paste the " .
        "following text from the windows into the text box.";
}

if ($experiment->technique == "ctrlc_ctrlv") {
    $experiment_instruction = " Use Ctrl+C and Ctrl+V to copy and paste the " .
        "following text from the windows into the text box.";
}
?>

<script>
var acp_open_windows = <?php echo $experiment->open_windows; ?>;
var acp_round = <?php echo ($_SESSION["experiment_step"] + 1); ?>;
var acp_granularity = "<?php echo $experiment->granularity; ?>";
var acp_stimuli = "<?php echo addcslashes ($experiment->stimuli, "\n"); ?>";
</script>

<div id="autocompaste" class="col-sm-9">
    <div id="autocompaste-display">

    </div>
</div>

<div id="instructions" class="col-sm-3">
    <h4><?php echo $experiment_title; ?></h4>
    <p>
        <?php echo $experiment_instruction; ?>
    </p>

    <pre><code><?php echo $experiment->stimuli; ?></code></pre>

    <span class="pull-right">
        <form method="POST" action="experiment.php?sid=<?php echo $session_id; ?>" id="experiment-form">
            <input type="hidden" name="experiment_raw" id="experiment-raw" value="" />
            <input type="hidden" name="experiment_time" id="experiment-time" value="0" />
            <button type="submit" class="btn btn-primary">Next &rarr;</button>
        </form>
    </span>
</div>

<div id="error-overlay">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Oops! Error loading experiment interface...</h4>
            </div>
            <div class="modal-body">
                <p>
                    There was an error while loading some of the components required for
                    the experiment. Please contact your investigator for further assistance.
                </p>

                <p>
                    Alternatively, you may try one of the two options below.
                </p>

                <p>
                    We apologize for the inconvenience caused.
                </p>
            </div>
            <div class="modal-footer">
                <a href="index.php" class="btn btn-default">Start Over</a>
                <a href="javascript:location.reload ();" class="btn btn-primary">Try Again</a>
            </div>
        </div>
    </div>
</div>

<?php
//include("testenv.html");
include ("./footer.php");
?>
