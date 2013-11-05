<?php
include ("./header.php");
?>

<div class="container">
    <h1>Rest time!</h1>
    <h4>Please wait 1 minute before you proceed.</h4>
    
    <p>
        The button below will be enabled once 1 minute has elapsed.
    </p>

    <form method="GET" action="experiment.php?sid=<?php echo $session_id; ?>">
        <button type="submit" class="btn btn-primary" id="rest-button" disabled>Next &rarr;</a>
    </form>

</div>

<?php
include ("./footer.php");
?>
