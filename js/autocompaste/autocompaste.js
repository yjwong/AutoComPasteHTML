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

    // Window switching capability through shortcuts.
    // Users can cycle through windows using Alt+Q (closest to Alt+Tab).
    var switcher_list = [ ];
    var switcher_list_item = -1;
    var switcher_list_pause_update = false;

    wm.addEventListener ('windowcreated', function (created_event) {
      switcher_list.push (created_event.name);
    });

    wm.addEventListener ('windowfocus', function (focus_event) {
      if (switcher_list_pause_update) {
        return;
      }

      // Search list for focused window.
      switcher_list = switcher_list.filter (function (value, index, array) {
        return focus_event.name != value;
      });

      switcher_list.push (focus_event.name);
    });

    jQuery (window).keydown (function (keydown_event) {
      if (keydown_event.altKey && keydown_event.keyCode == 81) {
        switcher_list_pause_update = true;

        switcher_list_item--;
        if (switcher_list_item < -1) {
          switcher_list_item = switcher_list.length - 2;
        }
        
        if (switcher_list_item == -1) {
          switcher_list_item = switcher_list.length - 1;
        }

        wm.setFocus (switcher_list[switcher_list_item]);
      }
    });
    
    jQuery (window).keyup (function (keyup_event) {
      if (keyup_event.keyCode == 18) {
        switcher_list_pause_update = false;
        wm.setFocus (switcher_list[switcher_list_item]);
        switcher_list_item = -1;
      }
    });
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

    // Highlight the relevant text.
    iface.addEventListener ('loaded', function () {
      var lines_to_highlight = acp_stimuli.split ("\n\n");
      
      var windows = wm.getWindowList ();
      for (var i = 0; i < windows.length; i++) {
        if (windows[i] == 'text_editor') {
          continue;
        }

        var win = wm.getWindowContent (windows[i]);
        var content = jQuery (win).find ('pre').html ();
        lines_to_highlight.map (function (value, index, array) {
          content = content.replace (value,
            "<span class=\"highlighted\">" + value + "</span>");
        });

        jQuery (win).find ('pre')
          .empty ()
          .append (content);
      }
    });

    // Measure the time and submit input strings.
    jQuery ('#experiment-form').submit (function (submit_event) {
      var end = new Date ().getTime () - start;
      jQuery ('#experiment-raw').val (
        jQuery ('#autocompaste-display .autocompaste-textarea').val ()
      );
      jQuery ('#experiment-time').val (end);
    });

    // Window switching capability through shortcuts.
    // Users can cycle through windows using Alt+Q (closest to Alt+Tab).
    var switcher_list = [ ];
    var switcher_list_item = -1;
    var switcher_list_pause_update = false;

    wm.addEventListener ('windowcreated', function (created_event) {
      switcher_list.push (created_event.name);
    });

    wm.addEventListener ('windowfocus', function (focus_event) {
      if (switcher_list_pause_update) {
        return;
      }

      // Search list for focused window.
      switcher_list = switcher_list.filter (function (value, index, array) {
        return focus_event.name != value;
      });

      switcher_list.push (focus_event.name);
    });

    jQuery (window).keydown (function (keydown_event) {
      if (keydown_event.altKey && keydown_event.keyCode == 81) {
        switcher_list_pause_update = true;

        switcher_list_item--;
        if (switcher_list_item < -1) {
          switcher_list_item = switcher_list.length - 2;
        }
        
        if (switcher_list_item == -1) {
          switcher_list_item = switcher_list.length - 1;
        }

        wm.setFocus (switcher_list[switcher_list_item]);
      }
    });
    
    jQuery (window).keyup (function (keyup_event) {
      if (keyup_event.keyCode == 18) {
        switcher_list_pause_update = false;
        wm.setFocus (switcher_list[switcher_list_item]);
        switcher_list_item = -1;
      }
    });
  }

  if (/\/rest.php/.test (path)) {
    setTimeout (function () {
      jQuery ('#rest-button').removeAttr ('disabled');
    }, 60000);
  }
  
});

/* vim: set ts=2 sw=2 et: */
