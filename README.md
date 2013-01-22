js-jquery-storage-image
=======================

javascript jquery plugin

Sample
------
    /
    ├── index.html
    ├── jquery.min.js
    ├── jquery.storage.image.js
    └── image.png

index.html
----------------
    <script src="./jquery.min.js"></script>
    <script src="./jquery.storage.image.js"></script>
    
    <script type="text/javascript">
    $(function() {
      $("#image").storageImage("./image.png");
    });
    </script>

    <body>
    <img id="image" />
    </body>
