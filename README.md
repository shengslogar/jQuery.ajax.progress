jQuery.ajax.progress
====================

Introduction
------------
jQuery's AJAX plugin is a powerful add-on to any web developer's arsenal.However, it's not long before it becomes
apparent that it lacks in both upload and download progress callbacks. This tiny plugin adds just that.


Requirements
------------
Naturally [jQuery](http://jquery.com). Nothing else.


Usage
-----
This plugin extends functions returned by a default jQuery AJAX object (such as `done` or `fail`) with two
new ones: `downloadProgress` and `uploadProgress`.

#### Download Progress

    $.ajax({
        url: "mypage.php"
    }).downloadProgress(function(e){
        if (e.lengthComputable) {
            var currentProgress = e.loaded / e.total;
            console.log("Percent loaded: ", currentProgress * 100);
        }
    });
    
Note: `$.ajax.progress` is also provided as an alias to `$.ajax.downloadProgress`. Neither function is recommended, but
is left up to the discretion of the programmer.

#### Upload Progress

    var formData = new FormData();
    
    // myFileObject would be an object retrieved from an <input type="file"> or FileReader
    formData.append("file", myFileObject);
    
    $.ajax({
        url: "uploader.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false
    }).uploadProgress(function (e) {
        if (e.lengthComputable) {
            var currentProgress = e.loaded / e.total;
            console.log("Percent uploaded: ", currentProgress * 100);
        }
    })

Note: for more information on performing jQuery file uploads, see <http://stackoverflow.com/a/9622978/2535504>.

Bugs
----
To file a bug report, please send an email to
[slogar.sheng@gmail.com](mailto:slogar.sheng@gmail.com?subject=jQuery.ajax.progress+Bug+Report).


Version History
---------------
1.0.0 (August 3, 2016)  

-   Initial version


License
---------------------

This work is licensed under the
[Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).
