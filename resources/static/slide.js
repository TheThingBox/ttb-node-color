(function( $ ) {
  $.fn.slide = function(opt) {
    var content = this;
    var header = $('<div class="accordion-header ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all"></div>');
    header.css({
      cursor: "pointer",
    });
    header.append(opt.title||'<span>Advanced</span>');
    var icon = $('<span></span>');
    icon.css({
      display: "inline-block",
    });
    header.prepend(icon);
    var icon_up = $('<span class="ui-icon ui-icon-triangle-1-e"></span>');
    var icon_down = $('<span class="ui-icon ui-icon-triangle-1-s"></span>');
    content.hide();
    var isShown = false;
    if(opt.onUp) opt.onUp();
    icon.html(icon_up);
    function change(){
      if (isShown){
        content.slideUp();
        if(opt.onUp) opt.onUp();
        isShown = false;
        icon.html(icon_up);
      }
      else{
        content.slideDown();
        if(opt.onDown) opt.onDown();
        isShown = true;
        icon.html(icon_down);
      }
    }
    content.before(header);
    header.click(function(){
      change();
    });
  };
}( jQuery ));
