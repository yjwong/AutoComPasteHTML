<?php
include ("./header.php");

// Create the session ID if it doesn't exist.
if (!isset ($_SESSION["participant_id"])) {
    if (isset ($_POST["participant_id"]) && !empty ($_POST["participant_id"])) {
        $_SESSION["participant_id"] = $_POST["participant_id"];
    } else {
        $_SESSION["notifications"][] = "No participant ID specified.";
        header ("Location: index.php");
        die ();
    }
}

// Check out the participant ID.
$experiments_json = file_get_contents ("data/experiments.json");
$experiments = json_decode ($experiments_json);
if (!property_exists ($experiments, $_SESSION["participant_id"])) {
    $_SESSION["notifications"][] = "Participant ID is not valid.";
    header ("Location: index.php");
    die ();
}
?>

<div class="container">
    <h1>Pre-Experiment Questionnaire</h1>
    <h4>Getting to know you better...</h4>

    <div class="row" style="margin-top: 20px;">
        <div class="col-sm-8 well">

            <form action="page2.php?sid=<?php echo $session_id; ?>" method="post">
                <fieldset>
                    <legend>Participant's Information</legend>

                    <div class="form-group">
                        <label for="participant-id">Participant ID</label>
                        <input type="text" name="participant_id" id="participant-id" value="<?php echo $_SESSION["participant_id"]; ?>" class="form-control" disabled />
                    </div>

                    <div class="form-group">
                        <label for="gender">Gender</label>

                        <div class="radio">
                            <label>
                                <input type="radio" name="gender" value="F" <?php echo isset ($saved_form["gender"]) && $saved_form["gender"] == "F" ? "checked" : ""; ?> /> Female
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="gender" value="M" <?php echo isset ($saved_form["gender"]) && $saved_form["gender"] == "M" ? "checked" : ""; ?> /> Male
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="age">Age</label>
                        <input type="number" name="age" id="age" class="form-control" placeholder="Age" value="<?php echo isset ($saved_form["age"]) ? $saved_form["age"] : ""; ?>" />
                    </div>

                    <div class="form-group">
                        <label for="occupation">Occupation</label>
                        <input type="text" name="occupation" id="occupation" class="form-control" placeholder="Occupation" value="<?php echo isset ($saved_form["occupation"]) ? $saved_form["occupation"] : ""; ?>" />
                    </div>

                    <div class="form-group">
                        <label for="native-language">Native Language</label>
                        <input type="text" name="native_language" id="native-language" class="form-control" placeholder="Native Language" value="<?php echo isset ($saved_form["native_language"]) ? $saved_form["native_language"] : ""; ?>" />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Health Status</legend>

                    <div class="form-group">
                        <label for="medical-conditions">
                            Do you have any prevailing medical conditions such as visual impairments
                            or physical disabilities?
                        </label>

                        <div class="radio">
                            <label>
                                <input type="radio" name="medical_conditions" value="Y" <?php echo isset ($saved_form["medical_conditions"]) && $saved_form["medical_conditions"] == "Y" ? "checked" : ""; ?> /> Yes
                            </label>
                        </div>

                        <div class="radio">
                            <label>
                                <input type="radio" name="medical_conditions" value="N" <?php echo isset ($saved_form["medical_conditions"]) && $saved_form["medical_conditions"] == "N" ? "checked" : ""; ?> /> No
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="taking-medication">
                            Are you taking any medication?
                        </label>

                        <div class="radio">
                            <label>
                                <input type="radio" name="taking_medication" value="Y" <?php echo isset ($saved_form["taking_medication"]) && $saved_form["taking_medication"] == "Y" ? "checked" : ""; ?> /> Yes
                            </label>
                        </div>

                        <div class="radio">
                            <label>
                                <input type="radio" name="taking_medication" value="N" <?php echo isset ($saved_form["taking_medication"]) && $saved_form["taking_medication"] == "N" ? "checked" : ""; ?> /> No
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="consumed-alcohol">
                            Have you consumed alcohol within the last 6 hours?
                        </label>

                        <div class="radio">
                            <label>
                                <input type="radio" name="consumed_alcohol" value="Y" <?php echo isset ($saved_form["consumed_alcohol"]) && $saved_form["consumed_alcohol"] == "Y" ? "checked" : ""; ?> /> Yes
                            </label>
                        </div>

                        <div class="radio">
                            <label>
                                <input type="radio" name="consumed_alcohol" value="N" <?php echo isset ($saved_form["consumed_alcohol"]) && $saved_form["consumed_alcohol"] == "Y" ? "checked" : ""; ?> /> No
                            </label>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Computer Use</legend>

                    <div class="form-group">
                        <label for="computer-familiarity">
                            On a scale of 1 to 5, how familiar are you with computers?
                            <small> (1 = least familiar; 5 = most familiar)</small>
                        </label>

                        <div>
                            <label class="radio-inline">
                                <input type="radio" name="computer_familiarity" value="1" <?php echo isset ($saved_form["computer_familiarity"]) && $saved_form["computer_familiarity"] == "1" ? "checked" : ""; ?> /> 1
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="computer_familiarity" value="2" <?php echo isset ($saved_form["computer_familiarity"]) && $saved_form["computer_familiarity"] == "2" ? "checked" : ""; ?> /> 2
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="computer_familiarity" value="3" <?php echo isset ($saved_form["computer_familiarity"]) && $saved_form["computer_familiarity"] == "3" ? "checked" : ""; ?> /> 3
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="computer_familiarity" value="4" <?php echo isset ($saved_form["computer_familiarity"]) && $saved_form["computer_familiarity"] == "4" ? "checked" : ""; ?> /> 4
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="computer_familiarity" value="5" <?php echo isset ($saved_form["computer_familiarity"]) && $saved_form["computer_familiarity"] == "5" ? "checked" : ""; ?> /> 5
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="open-documents">
                            While using a computer in a typical scenario (i.e. completing an assignment), how
                            many different documents are open on your desktop at once?
                        </label>

                        <input type="number" name="open_documents" id="open-documents" class="form-control" value="<?php echo isset ($saved_form["open_documents"]) ? $saved_form["open_documents"] : ""; ?>" />
                    </div>

                    <div class="form-group">
                        <label for="keyboard-shortcuts">
                            On a scale of 1 to 5, how often do you use keyboard shortcuts? 
                            <small>(1 = least often; 5 = most often)</small>
                        </label>

                        <div>
                            <label class="radio-inline">
                                <input type="radio" name="keyboard_shortcuts" value="1" <?php echo isset ($saved_form["keyboard_shortcuts"]) && $saved_form["keyboard_shortcuts"] == "1" ? "checked" : ""; ?> /> 1
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="keyboard_shortcuts" value="2" <?php echo isset ($saved_form["keyboard_shortcuts"]) && $saved_form["keyboard_shortcuts"] == "2" ? "checked" : ""; ?> /> 2
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="keyboard_shortcuts" value="3" <?php echo isset ($saved_form["keyboard_shortcuts"]) && $saved_form["keyboard_shortcuts"] == "3" ? "checked" : ""; ?> /> 3
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="keyboard_shortcuts" value="4" <?php echo isset ($saved_form["keyboard_shortcuts"]) && $saved_form["keyboard_shortcuts"] == "4" ? "checked" : ""; ?> /> 4
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="keyboard_shortcuts" value="5" <?php echo isset ($saved_form["keyboard_shortcuts"]) && $saved_form["keyboard_shortcuts"] == "5" ? "checked" : ""; ?> /> 5
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="copy-paste-frequency">
                            On a scale of 1 to 5, how often do you copy and paste text across documents?
                            <small>(1 = least often; 5 = most often)</small>
                        </label>

                        <div>
                            <label class="radio-inline">
                                <input type="radio" name="copy_paste_frequency" value="1" <?php echo isset ($saved_form["copy_paste_frequency"]) && $saved_form["copy_paste_frequency"] == "1" ? "checked" : ""; ?> /> 1
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="copy_paste_frequency" value="2" <?php echo isset ($saved_form["copy_paste_frequency"]) && $saved_form["copy_paste_frequency"] == "2" ? "checked" : ""; ?> /> 2
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="copy_paste_frequency" value="3" <?php echo isset ($saved_form["copy_paste_frequency"]) && $saved_form["copy_paste_frequency"] == "3" ? "checked" : ""; ?> /> 3
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="copy_paste_frequency" value="4" <?php echo isset ($saved_form["copy_paste_frequency"]) && $saved_form["copy_paste_frequency"] == "4" ? "checked" : ""; ?> /> 4
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="copy_paste_frequency" value="5" <?php echo isset ($saved_form["copy_paste_frequency"]) && $saved_form["copy_paste_frequency"] == "5" ? "checked" : ""; ?> /> 5
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="primary-method">
                            Which primary method do you use for copying and pasting text
                            across documents?
                        </label>

                        <div class="radio">
                            <label>
                                <input type="radio" name="primary_method" value="ctrlc_ctrlv" <?php echo isset ($saved_form["primary_method"]) && $saved_form["primary_method"] == "ctrlc_ctrlv" ? "checked" : ""; ?> /> Ctrl+C and Ctrl+V
                            </label>
                        </div>

                        <div class="radio">
                            <label>
                                <input type="radio" name="primary_method" value="using_secondary_click" <?php echo isset ($saved_form["primary_method"]) && $saved_form["primary_method"] == "using_secondary_click" ? "checked" : ""; ?> /> Using the Secondary Click Menu
                            </label>
                        </div>

                        <div class="radio">
                            <label>
                                <input type="radio" name="primary_method" value="other" id="primary-method-choice-other" <?php echo isset ($saved_form["primary_method"]) && $saved_form["primary_method"] == "other" ? "checked" : ""; ?> /> 
                            </label>

                            <div class="col-lg-3" style="padding-left: 0;">
                            <input type="text" name="primary_method_other" id="primary-method-other" class="form-control input-sm" placeholder="Other Method" value="<?php echo isset ($saved_form["primary_method_other"]) ? $saved_form["primary_method_other"] : ""; ?>" />
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="heard-of-autocompaste">
                            Have you heard of AutoComPaste before? 
                        </label>

                        <div class="radio">
                            <label>
                                <input type="radio" name="heard_of_autocompaste" value="Y" <?php echo isset ($saved_form["heard_of_autocompaste"]) && $saved_form["heard_of_autocompaste"] == "Y" ? "checked" : ""; ?> /> Yes
                            </label>
                        </div>

                        <div class="radio">
                            <label>
                                <input type="radio" name="heard_of_autocompaste" value="N" <?php echo isset ($saved_form["heard_of_autocompaste"]) && $saved_form["heard_of_autocompaste"] == "N" ? "checked" : ""; ?> /> No
                            </label>
                        </div>
                    </div>
                </fieldset>

                <input class="btn btn-primary" type="submit" value="Next &rarr;" />
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
