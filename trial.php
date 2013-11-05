<?php
include ("./header.php");
$participant_id = $_SESSION["participant_id"];
?>

<div id="autocompaste" class="col-sm-9">
    <div id="autocompaste-display">

    </div>
</div>

<div id="instructions" class="col-sm-3">
    <h4>Trial Run</h4>
    <p>
        Using either AutoComPaste or Ctrl+C and Ctrl+V, copy and paste the
        following text from the windows into the text box.
    </p>

    <pre><code>What is attenuate ? It is also
possible for articles to be part
of another part of speech
category such as a determiner,
an English part of speech 
category that combines 
articles and demonstratives 
(such as 'this' and 'that').

What is bandwidth ? Approximately
20 Hz to 20 kHz. Trivalent 
atoms that accept free electrons
from pentavalent atoms.</code></pre>

    <span class="pull-right">
        <a href="experiment.php?sid=<?php echo $session_id; ?>" class="btn btn-primary">
            Next &rarr;
        </a>
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
