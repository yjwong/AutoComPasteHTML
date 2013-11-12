<?php
include ("./header.php");

// Do form validation.
if (!isset ($_POST["gender"]) || empty ($_POST["gender"])) {
    $_SESSION["notifications"][] = "Please select your gender.";
}

if (!isset ($_POST["age"]) || empty ($_POST["age"])) {
    $_SESSION["notifications"][] = "Please fill in your age.";
}

if (!isset ($_POST["occupation"]) || empty ($_POST["occupation"])) {
    $_SESSION["notifications"][] = "Please fill in your occupation.";
}

if (!isset ($_POST["native_language"]) || empty ($_POST["native_language"])) {
    $_SESSION["notifications"][] = "Please fill in your native language.";
}

if (!isset ($_POST["medical_conditions"]) ||
    empty ($_POST["medical_conditions"])) {
    $_SESSION["notifications"][] = "Please check if you have any prevailing " .
        "medical conditions.";
}

if (!isset ($_POST["taking_medication"]) ||
    empty ($_POST["taking_medication"])) {
    $_SESSION["notifications"][] = "Please answer if you are taking any " .
        "medication.";
}

if (!isset ($_POST["consumed_alcohol"]) || empty ($_POST["consumed_alcohol"])) {
    $_SESSION["notifications"][] = "Please answer if you have consumed any " .
        "alcohol within the last 6 hours.";
}

if (!isset ($_POST["computer_familiarity"]) ||
    empty ($_POST["computer_familiarity"])) {
    $_SESSION["notifications"][] = "Please answer how familiar are you with " .
        "computers.";
}

if (!isset ($_POST["open_documents"]) || empty ($_POST["open_documents"])) {
    $_SESSION["notifications"][] = "Please answer how many different " .
        "documents are open on your desktop at once.";
}

if (!isset ($_POST["keyboard_shortcuts"]) ||
    empty ($_POST["keyboard_shortcuts"])) {
    $_SESSION["notifications"][] = "Please answer how often you use " .
        "keyboard shortcuts.";
}

if (!isset ($_POST["copy_paste_frequency"]) ||
    empty ($_POST["copy_paste_frequency"])) {
    $_SESSION["notifications"][] = "Please answer how often you copy and " .
        "paste text across documents.";
}

if (!isset ($_POST["primary_method"]) || empty ($_POST["primary_method"])) {
    $_SESSION["notifications"][] = "Please choose a primary method for " .
        "copying and pasting text across documents.";
} else {
    if ($_POST["primary_method"] == "other" &&
        (!isset ($_POST["primary_method_other"]) ||
        empty ($_POST["primary_method_other"]))) {
        $_SESSION["notifications"][] = "Please specify your other method for " .
            "copying and pasting text across documents.";
    }
}

if (!isset ($_POST["heard_of_autocompaste"]) ||
    empty ($_POST["heard_of_autocompaste"])) {
    $_SESSION["notifications"][] = "Please answer whether you have heard of " .
        "AutoComPaste before.";
}

if (isset ($_SESSION["notifications"]) &&
    is_array ($_SESSION["notifications"]) &&
    $_SESSION["notifications"] > 0) {
    $_SESSION["saved_form"] = $_POST;
    header ("Location: page1.php");
    die ();
} else {
    $_SESSION["page1_form"] = $_POST;
}
?>

<div class="container">
    <h1>Start Experiment</h1>
    <h4>Instructions for Participants</h4>
    
    <div class="row">
        <div class="col-sm-8">
            <p>
                Your task on the next screen is to copy and paste the specified 
                text from one window to another. <br />
                There are two ways in which you can copy and paste text:
            </p>

            <ul>
                <li>AutoComPaste</li>
                <li>Ctrl+C and Ctrl+V</li>
            </ul>

            <p>
                After clicking "Next &rarr;", you will be sent to a page where you
                can try out the two methods to familiarize yourself.
            </p>

            <p>
                Subsequently, there will be 18 short trials, run in 2 groups
                (for a total of 9 trials each). Each group will be punctuated
                by a 1 minute rest time.
            </p>

            <a class="btn btn-primary" href="trial.php?sid=<?php echo $session_id; ?>">
                Next &rarr;
            </a>
        </div>

        <div class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="panel-title">Information</div>
                </div>
                <div class="panel-body">
                    <p>
                    Require any assistance or clarification? Contact your investigator.
                    </p>
                </div>
            </div>
        </div>
    <div>

</div>

<?php
include ("./footer.php");
?>
