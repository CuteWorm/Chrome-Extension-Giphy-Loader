$(document).ready(function() {

    // this show preloader loading when getJson waiting result, support by Materialize 
    $(document).ajaxStart(function() {
        $('#content').html('<div class="preloader-wrapper big active"> <div class="spinner-layer spinner-blue"> <div class="circle-clipper left"> <div class="circle"></div> </div> <div class="gap-patch"> <div class="circle"></div> </div> <div class="circle-clipper right"> <div class="circle"></div> </div> </div> <div class="spinner-layer spinner-red"> <div class="circle-clipper left"> <div class="circle"></div> </div> <div class="gap-patch"> <div class="circle"></div> </div> <div class="circle-clipper right"> <div class="circle"></div> </div> </div> <div class="spinner-layer spinner-yellow"> <div class="circle-clipper left"> <div class="circle"></div> </div> <div class="gap-patch"> <div class="circle"></div> </div> <div class="circle-clipper right"> <div class="circle"></div> </div> </div> <div class="spinner-layer spinner-green"> <div class="circle-clipper left"> <div class="circle"></div> </div> <div class="gap-patch"> <div class="circle"></div> </div> <div class="circle-clipper right"> <div class="circle"></div> </div> </div> </div>');
    });

    $('#getGif').click(function(e) {
        e.preventDefault();
        // remove button copy image when click get image  continuously.
        $('#copyImage').remove();

        // Get value tag from input 
        let tag = $('#tag').val();
        // Link return random image   
        let url = 'https://api.giphy.com/v1/gifs/random?api_key=D2uR3vSJl9akcTQ1eRbjaiNbRR1m892O&tag=';

        // Because giphy return json object should we will use getJson
        /** 
         * @param url 
         * @param data  {tag}
         */
        $.getJSON(url, tag,
            function(json, textStatus, jqXHR) {
                // check json array length
                // if array length # 0 then show image
                // else show toast
                if (json.data.length != 0) {
                    showImage(json);
                } else {
                    Materialize.toast('No found image.', 3000, 'rounded');
                }
            }
        );
    });
    // Check status copy link image
    checkCopyLinkImage();
});

function checkCopyLinkImage() {
    var clipboard = new Clipboard('#copyImage');
    clipboard.on('success', function(e) {
        // console.log(e);
        // If copy success then remove button copy image and show toast.
        // remove button copy image.
        $('#copyImage').remove();
        // Show toast 'Copy successful image link!', support by Materialize
        Materialize.toast('Copy successful image link!', 3000, 'rounded');
    });
    clipboard.on('error', function(e) {
        // console.log(e);
        // If error then show toast
        // Show toast 'Copy fail image link!', support by Materialize
        Materialize.toast('Copy fail image link!', 3000, 'rounded');
    });
}

function showImage(json) {
    // Add image html to div content
    $('#content').html('<a href="' + json.data.url + '" target="_blank"><img class="responsive-img" src="' + json.data.image_original_url + '" alt="gif loading" title="' + json.datacaption + '"/></a>');
    // Add button copy after button get image 
    // This action click button copy image has clipboard.js handled.
    // Oly add data-clipboard-text="url_image" 
    $('#getGif').after(' <a id="copyImage" class="waves-effect waves-light btn-large" data-clipboard-text="' + json.data.image_original_url + '">Copy image</a>');
}