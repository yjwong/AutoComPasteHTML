jQuery (document).ready (function () {
  jQuery ('#notifications').click (function () {
    jQuery ('#notifications').css ('opacity', '0');
  });

  jQuery ('#primary-method-other').focus (function () {
    jQuery ('#primary-method-choice-other').click ();
  });

  // Is there ACP on this page?
  if (jQuery ('#autocompaste').length > 0) {
    jQuery ('.spacer').css ('height', '0px');

    // Stretch to fill entire display.
    jQuery ('#autocompaste-display').css ('height',
      jQuery (window).height () - 50);
  }

  jQuery (window).resize (function () {
    // Stretch to fill entire display.
    jQuery ('#autocompaste-display').css ('height',
      jQuery (window).height () - 50);
  });
});

/* vim: set ts=2 sw=2 et: */
