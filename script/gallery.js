/* for gallery.html */

function downloadimg()
{
  current_img_a = document.querySelector(".carousel-item.active").children[0].getAttribute("src");
  // console.log(current_img_a);
  window.open(current_img_a, "newWindow", "titlebar=0");
}

function readImage(file) {
  // Check if the file is an image.
  if (file.type && !file.type.startsWith('image/')) {
    console.log('File is not an image.', file.type, file);
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    img.src = event.target.result;
  });
  reader.readAsDataURL(file);
}

function uploadimg(dragged_status)
{
  var FILEINPUT;

  if (dragged_status == "dragged")
    upload();
  else if (dragged_status != "dragged") {
    FILEINPUT = document.querySelector(".file-input");
    FILEINPUT.click();

    FILEINPUT.addEventListener('change', function() {
      if (FILEINPUT.files.length > 0)
        upload();
      });
  }

  function upload()
  {
    var fileList = FILEINPUT.files;
    // console.log(fileList);

    var gallery = document.querySelector(".carousel-inner");

    for (var i in fileList) {
      indicator_counter++;
      var new_elem, new_img_src;

      new_elem = document.createElement("div");
      new_elem.classList.add("carousel-item");

      console.log(fileList[i]);
      new_img_src = window.URL.createObjectURL(fileList[i]);
      // console.log("new_img_src: " + new_img_src);

      var new_indicator = document.createElement("div")
      new_indicator.innerHTML = "<li data-target=\"#carouselExampleIndicators\" data-slide-to=\"" + indicator_counter + "\"></li>";
      document.querySelector(".carousel-indicators").appendChild(new_indicator);

      new_elem.innerHTML = "<img src='" + new_img_src + "' class='d-block w-100'>\
                            <div class='carousel-caption d-none d-md-block'>\
                            </div>"
      console.log
      gallery.appendChild(new_elem);
    }
  }

}
var indicator_counter = 2;
