/* 
//// upload form
<form action="api/picture" method="post" enctype="multipart/form-data">
<input type="file" name="fileImage"><br>
<input type="submit">
</form>

//// upload XMLHttpRequest
<button id="uploadFile" onclick="document.getElementById('fileImage').click();">Upload</button>

<form id="fileImage_form" enctype="multipart/form-data" style="height:1px;">
    <input id="fileImage" name="fileImage" type="file" style="visibility:hidden" onchange="upload_image();" accept="image/*" />
</form>

function upload_image() {
    var uInput = document.getElementById('fileImage');
    if (uInput.files[0]) {
        var formData = new FormData();
        formData.append("fileImage", uInput.files[0]);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
        xhttp.open("POST", "api/picture", true);
        //xhttp.setRequestHeader("Content-type", "multipart/form-data");
        xhttp.send(formData);
    }
}
*/

'use strict';
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

module.exports = function(router) {
    var uploadPath = path.join(process.cwd(), '/uploads/'); //it will be error if cant find this path and stop current process.
    //console.log(uploadPath);
    router.get('/picture', function(req, res) {
        res.json({ message: 'get ok' });   
    });
    router.post('/picture', function(req, res) {
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        //form.uploadDir = uploadPath;
        form.keepExtensions = false;
        form.maxFieldsSize = 2 * 1024 * 1024;
        form.maxFields = 1000;
        form.parse(req, function (err, fields, files) {
            if (err) throw err;
            //console.log(files);
            // `file` is the name of the <input> field of type `file`
            //var old_path = files.fileImage.path,
            //this get first found in files/might error!!
            var old_path = files[Object.keys(files)[0]].path,
            //file_size = files.file.size,
            //file_ext = files.fileImage.name.split('.').pop(),
            file_ext = files[Object.keys(files)[0]].name.split('.').pop(),
            index = old_path.lastIndexOf('/') + 1,
            file_name = old_path.substr(index),
            //new_path = path.join(process.env.PWD, '/uploads/', file_name + '.' + file_ext);
            new_path = path.join(uploadPath, file_name + '.' + file_ext);
            fs.readFile(old_path, function(err, data) {
                if (err) throw err;
                fs.writeFile(new_path, data, function(err) {
                    if (err) throw err;
                    fs.unlink(old_path, function(err) {
                        if (err) {
                            res.status(500);
                            res.json({'success': false});
                        } else {
                            res.status(200);
                            res.json({'success': true});
                        }
                    });
                });
            });


            // if (err) throw err;
            // var oldpath = files.filetoupload.path;
            // var newpath = files.filetoupload.name;
            // fs.rename(oldpath, newpath, function (err) {
            //     if (err) throw err;
            //     res.json({ message: 'ok200' });
            // });
        });
    });
    router.put('/picture', function(req, res) {
              console.log(req.body.data);
        res.json({ message: 'api post!' });   
    });
    router.delete('/picture', function(req, res) {
              console.log(req.body.data);
        res.json({ message: 'api post!' });   
    });
    
    // router.route('/textformat').post(function(req, res) {
    //   console.log(req.body.data);
    //   res.json({ message: 'hooray! welcome to our api!' }); 
    // });

    // router.route('/user').get(function(req, res) {
    //   res.json({ message: 'user' }); 
    // });
};
