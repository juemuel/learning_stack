const search = document.querySelector(".search-box input"),
      images = document.querySelectorAll(".image-box");
      

search.addEventListener("keyup", e=>{
  if(e.key == "Enter"){
    let searchValue = search.value.toLowerCase();
    images.forEach(image=>{
      if(searchValue === "" || image.dataset.name.includes(searchValue)){
        return image.style.display = "block";
      }
      return image.style.display = "none";
    })
  }
})

