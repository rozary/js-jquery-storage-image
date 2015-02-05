/*
 *
 *  @fileOverview jquery.storage.image.js
 *  @author syunsuke fujishiro
 *  @license <a href="http://en.wikipedia.org/wiki/MIT_License">X11/MIT License</a>
 *
 */

(function(jQuery) {
  $.fn.storageImage = function (imgSrc,version) {
    "use strict";
    if (!version) version = "";
    var selector = $(this).selector.slice(1);

    var setData = function (tgt,data_img) {
      if (!data_img) {
        console.log("no data_img");
        return 1;
      }
      var tag = tgt.tagName;
      if (tag == "DIV") {
        $(tgt).css("background-image","url(" + data_img + ")");
      } else if (tag == "IMG") {
        tgt.src = data_img;
        return 1;
      }
      return 1;
    }

    return this.each(function(){
        var tgt = $(this).get(0);
        //      var lStorage = localStorage;
        var lStorage = sessionStorage;
        if (!lStorage) {
          return 1;
        }

        /*Android 2系はtoDataURLが使えない為
        そのままsrcを当て込む*/
        if (navigator.userAgent.search(/Android 2.[123]/) != -1) {
          setData(tgt,imgSrc);
          return 1;
        }

        var idName = this.id;
        var data_img;
        var key;
        if (idName) {
          key = this.id;
        } else if (selector) {
          key = selector;
        }
        key = key + "_" + version;
        data_img = lStorage.getItem(key);
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
            //セットに失敗したら
            //srcをそのままsetData
            //そしてデータをクリアする
            try {
              lStorage.setItem(key, data_img);
            } catch(e) {
              if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                lStorage.clear();
                data_img = imgSrc;
              } else {
                console.log(e);
              }
            };
            //読み終わった後に実行
            setData(tgt,data_img);
          };
        } else {
          setData(tgt,data_img);
        }
      });
  };
})(jQuery);
