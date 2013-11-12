/* ========================================================================
 * An implementation of AutoComPaste in HTML
 * http://github.com/yjwong/autocompaste.git
 * ========================================================================
 * Copyright 2013 Wong Yong Jie
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */

(function () {
  /**
   * AutoComPaste jQuery Plugin
   * To use this plugin, run jQuery ('#my-text-field').autocompaste ().
   */
  jQuery.fn.autocompaste = function (engine) {
    var editor = new AutoComPaste.Editor (this, engine);
    return this;
  }
} ());

jQuery (document).ready (function () {
  var path = location.pathname;

  if (/\/trial\.php/.test (path)) {
    var wm = new WindowManager ('autocompaste-display');
    var engine = new AutoComPaste.Engine ();
    var iface = new AutoComPaste.Interface (wm, engine, 'data/texts.json');
  }

  if (/\/experiment.php/.test (path)) {
    var iface_json;
    if (acp_open_windows == 2) {
      iface_json = "data/texts_2.json";
    } else if (acp_open_windows == 4) {
      iface_json = "data/texts_4.json";
    } else {
      iface_json = "data/texts.json";
    }

    var wm = new WindowManager ('autocompaste-display');
    var engine = new AutoComPaste.Engine ();
    var iface = new AutoComPaste.Interface (wm, engine, iface_json);
    var start = new Date ().getTime ();

    // Measure the time and submit input strings.
    jQuery ('#experiment-form').submit (function (submit_event) {
      var end = new Date ().getTime () - start;
      jQuery ('#experiment-raw').val (
        jQuery ('#autocompaste-display .autocompaste-textarea').val ()
      );
      jQuery ('#experiment-time').val (end);
    });
  }

  if (/\/rest.php/.test (path)) {
    setTimeout (function () {
      jQuery ('#rest-button').removeAttr ('disabled');
    }, 60000);
  }
  
});

/* vim: set ts=2 sw=2 et: */
