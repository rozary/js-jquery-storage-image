js-jquery-storage-image
=======================

javascript jquery plugin

Example
-------
    /
    ├── index.html
    ├── jquery.storage.image.js
    └── image.png

index.html
----------
    <script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="./jquery.storage.image.js"></script>
    
    <script type="text/javascript">
    $(function() {
      var version = "0.0.1";  //(optional)version change is saved by the new key.
      $("#image1").storageImage("./image.png",version);
      $("#image2").storageImage("./image.png",version);
    });
    </script>

    <body>
      <img id="image1" /> // src
      <div id="image2"></div> // background-image
    </body>
