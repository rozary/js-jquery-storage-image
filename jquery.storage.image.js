/*
 *
 *  @fileOverview jquery.storage.image.js
 *  @author syunsuke fujishiro
 *  @license <a href="http://en.wikipedia.org/wiki/MIT_License">X11/MIT License</a>
 *
 */

(function(jQuery) {
  $.fn.storageImage = function (imgSrc) {
    "use strict";
    var selector = $(this).selector.slice(1);

    var setData = function (tgt,data_img) {
      var tag = tgt.tagName;
      if (tag == "DIV") {
        $(tgt).css("background-image","url(" + data_img + ")");
      } else if (tag == "IMG") {
        tgt.src = data_img;
      }
      return 1;
    }

    return this.each(function(){
//      var lStorage = localStorage;
      var lStorage = sessionStorage;
      var idName = this.id;
      var data_img;
      if (idName) {
        data_img = lStorage.getItem(this.id);
      } else if (selector) {
        data_img = lStorage.getItem(selector);
      }
      var tgt = $(this).get(0);
      if (!data_img) {
        /*no storage*/
        var img = new Image();
        var idName = this.id;
        img.src = imgSrc;
        var canvas;
        if (idName) {
          $(this).after('<canvas id="canvas_'+ this.id +'" style="display:none"></canvas>');
          canvas = $("#canvas_"+ this.id).get(0);
        } else if (selector) {
          $(this).after('<canvas class="canvas_'+ selector +'" style="display:none"></canvas>');
          canvas = $(".canvas_"+ selector).get(0);
        }
        var ctx = canvas.getContext("2d");
        img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img,0,0);
          data_img = canvas.toDataURL();
          if (idName) {
            lStorage.setItem(idName, data_img);
          } else if (selector) {
            lStorage.setItem(selector, data_img);
          }
          setData(tgt,data_img);
        };
      }
      setData(tgt,data_img);
    });
  };
})(jQuery);
