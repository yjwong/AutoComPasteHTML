<?php
include ("./header.php");
?>
    <div class="jumbotron">
        <div class="container">
            <h1>AutoComPaste Experiment</h1>
            <p>
                Thank you for participating in this experiment. To begin, key
                in your participant ID below.
            </p>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-sm-8">
                <p>
                    AutoComPaste is a novel technique in copying and pasting text across different
                    documents on a computer.
                </p>

                <p>
                    In the next few steps, you will be prompted to complete the following:
                </p>

                <ul>
                    <li>A pre-experiment questionnaire</li>
                    <li>The experiment itself</li>
                    <li>A post-experiment questionnaire</li>
                </ul>

                <form action="page1.php?sid=<?php echo $session_id; ?>" method="post">
                    <div class="form-group">
                        <label for="participant-id">Participant ID</label>
                        <input class="form-control" type="text" name="participant_id" autofocus />
                    </div>

                    <div class="alert alert-info">
                        <strong>No participant ID?</strong>
                        Contact your investigator for help.
                    </div>
                    
                    <input class="btn btn-primary" id="submit" type="submit" value="Next &rarr;">
                </form>
            </div>
            <div class="col-sm-4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="panel-title">About</div>
                    </div>
                    <div class="panel-body">
                        <p>
                        This experiment is conducted by <a href="http://yjwong.name/">Wong Yong Jie</a>
                        as part of a project in CS4249 Phenomena and Theories of Human Computer Interaction,
                        <a href="http://www.nus.edu.sg/">National University of Singapore</a>.
                        </p>
                        
                        <p>
                        Please contact <a href="mailto:wong.yong.jie@nus.edu.sg">wong.yong.jie@nus.edu.sg</a>
                        if you have any questions. My course coordinator is Zhao Shengdong 
                        <a href="mailto:zhaosd@comp.nus.edu.sg">zhaosd@comp.nus.edu.sg</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

<?php
include ("./footer.php");
?>
