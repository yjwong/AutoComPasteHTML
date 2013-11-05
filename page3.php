<?php
include ("./header.php");
?>

<div class="container">
    <h1>Post-Experiment Questionnaire</h1>
    <h4>How did you feel?</h4>

    <div class="row" style="margin-top: 20px;">
        <div class="col-sm-8 well">

            <form action="finish.php?sid=<?php echo $session_id; ?>" method="post">
                <fieldset>
                    <legend>Accuracy</legend>

                    <div class="form-group">
                        <label for="accurate-intention">
                            AutoComPaste is accurate in predicting my intention.
                            <small> (1 = strongly disagree; 5 = strongly agree)</small>
                        </label>

                        <div>
                            <label class="radio-inline">
                                <input type="radio" name="accurate_intention" value="1" <?php echo isset ($saved_form["accurate_intention"]) && $saved_form["accurate_intention"] == "1" ? "checked" : ""; ?> /> 1
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="accurate_intention" value="2" <?php echo isset ($saved_form["accurate_intention"]) && $saved_form["accurate_intention"] == "2" ? "checked" : ""; ?> /> 2
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="accurate_intention" value="3" <?php echo isset ($saved_form["accurate_intention"]) && $saved_form["accurate_intention"] == "3" ? "checked" : ""; ?> /> 3
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="accurate_intention" value="4" <?php echo isset ($saved_form["accurate_intention"]) && $saved_form["accurate_intention"] == "4" ? "checked" : ""; ?> /> 4
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="accurate_intention" value="5" <?php echo isset ($saved_form["accurate_intention"]) && $saved_form["accurate_intention"] == "5" ? "checked" : ""; ?> /> 5
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="less-mistakes">
                            I make less mistakes when using AutoComPaste as compared to using Ctrl+C and Ctrl+V.
                            <small> (1 = strongly disagree; 5 = strongly agree)</small>
                        </label>

                        <div>
                            <label class="radio-inline">
                                <input type="radio" name="less_mistakes" value="1" <?php echo isset ($saved_form["less_mistakes"]) && $saved_form["less_mistakes"] == "1" ? "checked" : ""; ?> /> 1
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="less_mistakes" value="2" <?php echo isset ($saved_form["less_mistakes"]) && $saved_form["less_mistakes"] == "2" ? "checked" : ""; ?> /> 2
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="less_mistakes" value="3" <?php echo isset ($saved_form["less_mistakes"]) && $saved_form["less_mistakes"] == "3" ? "checked" : ""; ?> /> 3
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="less_mistakes" value="4" <?php echo isset ($saved_form["less_mistakes"]) && $saved_form["less_mistakes"] == "4" ? "checked" : ""; ?> /> 4
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="less_mistakes" value="5" <?php echo isset ($saved_form["less_mistakes"]) && $saved_form["less_mistakes"] == "5" ? "checked" : ""; ?> /> 5
                            </label>
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>Efficiency</legend>

                    <div class="form-group">
                        <label for="minimize-effort">
                            AutoComPaste is able to minimize the effort required for me to complete the goal.
                            <small> (1 = strongly disagree; 5 = strongly agree)</small>
                        </label>

                        <div>
                            <label class="radio-inline">
                                <input type="radio" name="minimize_effort" value="1" <?php echo isset ($saved_form["minimize_effort"]) && $saved_form["minimize_effort"] == "1" ? "checked" : ""; ?> /> 1
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="minimize_effort" value="2" <?php echo isset ($saved_form["minimize_effort"]) && $saved_form["minimize_effort"] == "2" ? "checked" : ""; ?> /> 2
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="minimize_effort" value="3" <?php echo isset ($saved_form["minimize_effort"]) && $saved_form["minimize_effort"] == "3" ? "checked" : ""; ?> /> 3
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="minimize_effort" value="4" <?php echo isset ($saved_form["minimize_effort"]) && $saved_form["minimize_effort"] == "4" ? "checked" : ""; ?> /> 4
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="minimize_effort" value="5" <?php echo isset ($saved_form["minimize_effort"]) && $saved_form["minimize_effort"] == "5" ? "checked" : ""; ?> /> 5
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="lesser-steps">
                            AutoComPaste allows me to complete the goal in lesser number of steps as compared to Ctrl+C and Ctrl+V.
                            <small> (1 = strongly disagree; 5 = strongly agree)</small>
                        </label>

                        <div>
                            <label class="radio-inline">
                                <input type="radio" name="lesser_steps" value="1" <?php echo isset ($saved_form["lesser_steps"]) && $saved_form["lesser_steps"] == "1" ? "checked" : ""; ?> /> 1
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="lesser_steps" value="2" <?php echo isset ($saved_form["lesser_steps"]) && $saved_form["lesser_steps"] == "2" ? "checked" : ""; ?> /> 2
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="lesser_steps" value="3" <?php echo isset ($saved_form["lesser_steps"]) && $saved_form["lesser_steps"] == "3" ? "checked" : ""; ?> /> 3
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="lesser_steps" value="4" <?php echo isset ($saved_form["lesser_steps"]) && $saved_form["lesser_steps"] == "4" ? "checked" : ""; ?> /> 4
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="lesser_steps" value="5" <?php echo isset ($saved_form["lesser_steps"]) && $saved_form["lesser_steps"] == "5" ? "checked" : ""; ?> /> 5
                            </label>
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>Learnability</legend>

                    <div class="form-group">
                        <label for="enjoyment">
                            I enjoy using AutoComPaste.
                            <small> (1 = strongly disagree; 5 = strongly agree)</small>
                        </label>

                        <div>
                            <label class="radio-inline">
                                <input type="radio" name="enjoyment" value="1" <?php echo isset ($saved_form["enjoyment"]) && $saved_form["enjoyment"] == "1" ? "checked" : ""; ?> /> 1
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="enjoyment" value="2" <?php echo isset ($saved_form["enjoyment"]) && $saved_form["enjoyment"] == "2" ? "checked" : ""; ?> /> 2
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="enjoyment" value="3" <?php echo isset ($saved_form["enjoyment"]) && $saved_form["enjoyment"] == "3" ? "checked" : ""; ?> /> 3
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="enjoyment" value="4" <?php echo isset ($saved_form["enjoyment"]) && $saved_form["enjoyment"] == "4" ? "checked" : ""; ?> /> 4
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="enjoyment" value="5" <?php echo isset ($saved_form["enjoyment"]) && $saved_form["enjoyment"] == "5" ? "checked" : ""; ?> /> 5
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="easy-to-learn">
                            AutoComPaste is easy to learn.
                            <small> (1 = strongly disagree; 5 = strongly agree)</small>
                        </label>

                        <div>
                            <label class="radio-inline">
                                <input type="radio" name="easy_to_learn" value="1" <?php echo isset ($saved_form["easy_to_learn"]) && $saved_form["easy_to_learn"] == "1" ? "checked" : ""; ?> /> 1
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="easy_to_learn" value="2" <?php echo isset ($saved_form["easy_to_learn"]) && $saved_form["easy_to_learn"] == "2" ? "checked" : ""; ?> /> 2
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="easy_to_learn" value="3" <?php echo isset ($saved_form["easy_to_learn"]) && $saved_form["easy_to_learn"] == "3" ? "checked" : ""; ?> /> 3
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="easy_to_learn" value="4" <?php echo isset ($saved_form["easy_to_learn"]) && $saved_form["easy_to_learn"] == "4" ? "checked" : ""; ?> /> 4
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="easy_to_learn" value="5" <?php echo isset ($saved_form["easy_to_learn"]) && $saved_form["easy_to_learn"] == "5" ? "checked" : ""; ?> /> 5
                            </label>
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>Other Comments</legend>

                    <div class="form-group">
                        <label for="enjoyment">
                            Please leave any comments you may have:
                        </label>

                        <div>
                            <textarea class="form-control" name="other_comments" placeholder="Other Comments..."></textarea>
                        </div>
                    </div>

                </fieldset>

                <input class="btn btn-primary" type="submit" value="Finish &rarr;" />
            </form>
        </div>

        <div class="col-sm-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="panel-title">In this section...</div>
                </div>
                <div class="panel-body">
                    <p>
                    Complete all the fields. All fields are required.
                    </p>
                </div>
            </div>

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
