/*
 *
 *  @fileOverview jquery.storage.image.js
 *  @author syunsuke fujishiro
 *  @license <a href="http://en.wikipedia.org/wiki/MIT_License">X11/MIT License</a>
 *
 */

(function(jQuery) {
  jQuery.fn.storageImage = function (imgSrc) {
    return this.each(function(){
      var lStorage = localStorage;
      var data_img = lStorage.getItem(this.id);
      var tgt = jQuery(this).get(0);
      if (data_img) {
        /*ok storage*/
        tgt.src = data_img;
      } else {
        /*no storage*/
        var img = new Image();
        var idName = this.id;
        img.src = imgSrc;
        jQuery(this).after('<canvas id="canvas_'+ this.id +'" style="display:none"></canvas>');
        var canvas = jQuery("#canvas_"+ this.id).get(0);
        var ctx = canvas.getContext("2d");
        img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img,0,0);
          data_img = canvas.toDataURL();
          lStorage.setItem(idName, data_img);
          tgt.src = data_img;
        };
      }
    });
  };
})(jQuery);
