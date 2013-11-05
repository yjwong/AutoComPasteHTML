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

"use strict";

var AutoComPaste = AutoComPaste || { };

/**
 * Interface module.
 *
 * @class Interface
 */
AutoComPaste.Interface = (function () {

  /** Private variables */
  var privates = { };

  /**
   * The class constructor.
   */
  function Interface (wm, engine, texts_json) {
    /** Internal functions */
    this._showError = function _showError () {
      document.getElementById ('error-overlay').style.display = 'block';
    };

    this._fetchTexts = function _fetchTexts () {
      jQuery.ajax (privates.texts_json, {
        dataType: 'json',
        error: this._fetchTextsError,
        success: this._fetchTextsSuccess
      });
    };

    this._fetchTextsError = function _fetchTextsError (jqxhr, text_status,
        error_thrown) {
      iface._showError ();
      console.error ("Interface._fetchTextsError: Unable to parse text sources: " + text_status);
      console.error ("Interface._fetchTextsError: Additional info: " + error_thrown);
    };

    this._fetchTextsSuccess = function _fetchTextsSuccess (data, text_status,
        jqxhr) {
      // Check the sanity of data.
      if (!Array.isArray (data)) {
        iface._showError ();
        console.error ("Interface._fetchTextsSuccess: Unable to parse text sources: data is not an array");
        return;
      }

      // Fetch each text and process.
      privates.texts_available = data.length;
      for (var i = 0; i < data.length; i++) {
        iface._fetchText (data[i]);
      }
    };

    this._fetchText = function _fetchText (text_source) {
      // Verify if the text_text_source object has all the required properties.
      if (typeof text_source != 'object') {
        console.error ("Interface._fetchText: Unable to process text source. Additional info: ");
        console.error (text_source);
        return;
      }

      if (!text_source.hasOwnProperty ('title')) {
        console.error ("Interface._fetchText: Source must have a title. Additional info: ");
        console.error (text_source);
        return;
      }

      if (!text_source.hasOwnProperty ('url')) {
        console.error ("Interface._fetchText: Source must have a url. Additional info: ");
        console.error (text_source);
        return;
      }

      jQuery.ajax (text_source.url, {
        complete: this._fetchTextComplete,
        dataType: 'text',
        error: this._fetchTextError,
        success: function (data, text_status, jqxhr) {
          return iface._fetchTextSuccess (data, text_status, jqxhr, text_source);
        }
      });
    };

    this._fetchTextComplete = function _fetchTextComplete (jqxhr, text_status) {
      privates.texts_returned++;
      if (privates.texts_returned == privates.texts_available) {
        // At this point, we have all the texts already.
        // Begin constructing the UI.
        //
        // For every text that we find, we create a new window for it.
        console.log ("Interface._fetchTextComplete: Finished fetching all texts");

        for (var text_title in privates.texts) {
          if (privates.texts.hasOwnProperty (text_title)) {
            console.log ("Interface._fetchTextComplete: Creating window for text \"" + text_title + "\"");
            iface._createWindowForText (text_title);

            console.log ("Interface._fetchTextComplete: Adding text \"" + text_title + "\" to ACP engine");
            privates.engine.addToIndex (text_title, privates.texts[text_title]);
          }
        }

        // Create a text editor window.
        privates.wm.createWindow ("text_editor");
        privates.wm.setWindowTitle ("text_editor", "Text Editor");
        privates.wm.setWindowContent ('text_editor',
          jQuery (document.createElement ('textarea'))
            .attr ({
              'rows': 10,
              'cols': 40
            })
            .autocompaste (privates.engine)
        );
      }
    };

    this._fetchTextError = function _fetchTextError (jqxhr, text_status,
        error_thrown) {
      iface._showError ();
      console.error ("Interface._fetchTextError: Unable to retrieve source: " + this.url);
    };

    this._fetchTextSuccess = function _fetchTextsSuccess (data, text_status, 
        jqxhr, text_source) {
      console.log ("Interface._fetchTextSuccess: Retrieved source: " + text_source.url);
      privates.texts[text_source.title] = data;
    };

    this._createWindowForText = function _createWindowForText (text_title) {
      // TODO: fix hardcoded window sizes
      privates.wm.createWindow (text_title, 500, 400);
      privates.wm.setWindowTitle (text_title, text_title);
      privates.wm.setWindowContent (text_title,
          jQuery (document.createElement ('pre'))
            .append (privates.texts[text_title])
            .css ('white-space', 'pre-word')
      );

      // Position the window randomly.
      //
      // safety_bounds ensures that the window is at least some pixels within 
      // the boundaries of the display.
      // TODO: Random numbers don't seem to be well generated here.
      var safety_bounds = 200;
      privates.wm.moveWindowTo (text_title,
          Math.random () * (privates.wm.getDisplayWidth () - safety_bounds) + (safety_bounds / 2),
          Math.random () * (privates.wm.getDisplayHeight () - safety_bounds) + (safety_bounds / 2)
      );
    };
   
    /** Constructor */
    if (wm == undefined) {
      console.error ("Interface: wm must be given");
      return;
    }

    if (typeof wm != 'object' && !(wm instanceof AutoComPaste.WindowManager)) {
      console.error ("Interface: wm must be of type AutoComPaste.WindowManager");
      return;
    }

    if (engine == undefined) {
      console.error ("Interface: engine must be given");
      return;
    }

    if (typeof engine != 'object' && !(engine instanceof AutoComPaste.Engine)) {
      console.error ("Interface: engine must be of type AutoComPaste.Engine");
      return;
    }

    if (texts_json == undefined) {
      console.error ("Interface: texts_json must be given");
      return;
    }

    if (typeof texts_json != 'string' && !(texts_json instanceof String)) {
      console.error ("Interface: texts_json must be of type String");
      return;
    }
    
    console.log ("Interface: starting using data url: " + texts_json);

    // Define private variables.
    var iface = this;

    privates.texts = { };
    privates.texts_json = texts_json;
    privates.texts_available = 0;
    privates.texts_returned = 0;
    privates.engine = engine;
    privates.wm = wm;
    
    // Fetch all the texts.
    this._fetchTexts ();
  }

  return Interface;

}) (); 

/* vim: set ts=2 sw=2 et: */
