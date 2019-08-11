let dropArea = document.getElementById("drop-area");
let background = document.querySelector(".background");
let menu = document.querySelector(".menu");
let displayMenuBtn = document.querySelector(".menu-btn");
let hideMenuBtn = document.querySelector(".hide-btn");
let uploadedFiles = 0;

//Custom JS
displayMenuBtn.addEventListener("click", () => {
    menu.classList.add("active");
});
hideMenuBtn.addEventListener("click", () => {
    menu.classList.remove("active");
});


// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)   
    document.body.addEventListener(eventName, preventDefaults, false)
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
    background.addEventListener(eventName, unhighlight, false)
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e) {
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    dropArea.classList.remove('highlight')
}

function handleDrop(e) {
    var dt = e.dataTransfer
    var files = dt.files

    handleFiles(files)
}

let uploadProgress = []
let progressBar = document.querySelector('.progress')

function initializeProgress(numFiles) {
    progressBar.style.width = 0 + "%";
    uploadProgress = []

    for(let i = numFiles; i > 0; i--) {
        uploadProgress.push(0)
    }
}

function updateProgress(fileNumber, percent) {
    uploadProgress[fileNumber] = percent
    let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
    progressBar.style.width = total + "%";
    if(total === 100) {
        progressBar.style.width = "0%";
    }
}

function handleFiles(files) {
    files = [...files]
    initializeProgress(files.length)
    files.forEach(uploadFile)
}

function uploadFile(file, i) {
    var url = './upload_file.php'
    var xhr = new XMLHttpRequest()
    var formData = new FormData()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", function(e) {
        updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
    })

    xhr.addEventListener('readystatechange', function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            updateProgress(i, 100);
            let response = JSON.parse(xhr.responseText);

            if(response.success) {
                let list = menu.querySelector("ul");
                list.innerHTML = "<li class='new'>" + response.file + "</li>" + list.innerHTML;

                uploadedFiles++;
                document.querySelector(".amount").style.display = "block";
                document.querySelector(".amount").innerHTML = uploadedFiles;
            } else {
                alert(response.error + " " + response.file);
            }
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
        // Error. Inform the user
        }
    })

    formData.append('upload_preset', 'ujpu6gyk')
    formData.append('file', file)
    xhr.send(formData)
}