
const uploadBtn = document.getElementById("uploadBtn");
const clearUploadBtn = document.getElementById("clearUploadBtn");
const uploadEndpoint = "//christopher5106.github.io/img/mac_digits.png?" + new Date().getTime();

clearUploadBtn.addEventListener('click', function(e) {
    let uploadBtn = $('#uploadBtn');
    let clearUploadBtn = $('#clearUploadBtn');
    let progressBarFill = $('.progress-bar');
    let progressBarCount = $('.progress-count');  

    progressBarFill.removeClass('bg-success');
    progressBarFill.css('width', '0%');
    progressBarFill.attr('aria-valuenow', '0');
    progressBarCount.text('');
    clearUploadBtn.attr("disabled", "disabled");
    uploadBtn.removeAttr("disabled", "disabled");     
    
});

uploadBtn.addEventListener('click', function(e) {
    let uploadBtn = $('#uploadBtn');
    let clearUploadBtn = $('#clearUploadBtn');
    uploadBtn.attr("disabled", "disabled");
    clearUploadBtn.attr("disabled", "disabled");
    let progressBarFill = $('.progress-bar');
    let progressBarCount = $('.progress-count');

    var xhr = new XMLHttpRequest();
    xhr.open("GET", uploadEndpoint);
    xhr.onprogress = function (e) {
        if (e.lengthComputable) {
            console.log(e.loaded+  " / " + e.total);
            let progressValue = Math.floor(e.loaded/e.total * 100);

            progressBarFill.removeClass('bg-success');
            progressBarFill.addClass('progress-bar-striped');
            progressBarFill.css('width', progressValue + '%');
            progressBarFill.attr('aria-valuenow', progressValue);
            progressBarCount.text(progressValue + '%');
        }
    }
    xhr.onloadstart = function (e) {
        console.log("start")
    }
    xhr.onloadend = function (e) {
        progressBarFill.removeClass('progress-bar-striped');
        progressBarFill.addClass('bg-success');
        progressBarCount.text('Upload Complete');
        clearUploadBtn.removeAttr("disabled", "disabled");
        console.log("end")
    }
    xhr.send();
    
});


function sampleProgress(){
    let uploadBtn = $('#uploadBtn');
    uploadBtn.attr("disabled", "disabled");
    let progressNumber = 0;
    let progressBarFill = $('.progress-bar');
    let progressBarCount = $('.progress-count');

    let progressStatus = setInterval(function(){
progressNumber++;
    let progressValue = progressNumber * 13;
    if(progressValue > 100) progressValue = 100;

    progressBarFill.addClass('progress-bar-striped');
    progressBarFill.css('width', progressValue + '%');
    progressBarFill.attr('aria-valuenow', progressValue);
    progressBarCount.text(progressValue + '%');
    
    if(progressValue >= 100){
        progressBarFill.removeClass('progress-bar-striped');
        progressBarFill.addClass('bg-success');
        progressBarCount.text('Upload Complete');
        uploadBtn.removeAttr("disabled", "disabled");
        clearInterval(progressStatus);
    }
    }, 1000);
}