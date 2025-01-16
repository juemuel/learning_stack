import { LazyLoadImages } from './02lazyload.js';
// import { downloadImg } from "./downloadImg.js";
const search = document.querySelector(".search-box input");
let images = document.querySelectorAll(".image-item");
const loadMoreBtn = document.querySelector(".load-more");
const closePreviewBtn = document.querySelector(".lightbox");
const downloadPreviewBtn = document.querySelector(".bi-box-arrow-down");

// 使用pexels api
const apiKey = "G51f9S2QurOeovckJpCbKeScgBUWqkqz5DsjHVMsj2H7mRof19N2PwHb";
let currentPage = 1;
let searchTerm = null;
const perPage = 7;
let apiURL_pixels_all = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
let apiURL_pixels_search = `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`;
const updateURLValue = () =>{
  apiURL_pixels_all = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  apiURL_pixels_search = `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`;
}
const imageWrapper = document.querySelector(".images")


const generateHTML = (images) => {
  imageWrapper.innerHTML += images.map(img =>
    `<li class="image-item" data-name="${img.photographer}" onclick="showLightbox('${img.photographer}','${img.src.large2x}');">
        <img src="images/loading02.gif" data-src="${img.src.large2x}" alt="">
        <div class="image-details">
          <div class="item-name">
            <i class="bi bi-camera"></i>
            <span>${img.photographer}</span>
          </div>
          <button onclick="downloadImgByHttp('${img.src.large2x}');event.stopPropagation();">
            <i class="bi bi-box-arrow-down"></i>
          </button>
        </div>
      </li>`
      // 方案1：onclick字面量传參，出现bugdownloadImg is not defined at HTMLButtonElement.onclick
      // 已解决：在html head处添加该函数即可
      // EXP：在html中使用字面量的形式，其中方法在html文件中保证已经被引入即可
      // <button onclick="downloadImgURL('${img.src.large2x}');">
      //       <i class="bi bi-box-arrow-down"></i>
      // </button>
      // 方案2：class获取后分别注册，曲线救国啦，决定鸽了
      // <button class="download-img" data-imgsrc="${img.src.large2x}">
      //   <i class="bi bi-box-arrow-down"></i>
      // </button>
    ).join("");
}

// 通过fetch请求API的图片，返回promise（可以处理res、data），其中的参数具体见官方文档
function getAPIImages(apiURL) {
  return fetch(apiURL, { headers: { Authorization: apiKey } })
    .then(res => res.json())
    .then(data => {
      generateHTML(data.photos);
      LazyLoadImages.initLazyLoad_IntersectionObserver();})
}

// 首屏手动api调用，采用Promise+
getAPIImages(apiURL_pixels_all).finally(()=>{console.log("API图片首屏加载完成");});;

closePreviewBtn.addEventListener("click", e=>{
  closeLightbox();
})
downloadPreviewBtn.addEventListener("click",e=>{
  downloadImgByLocal(e.target.dataset.img)
})
search.addEventListener("keyup", e=>{
  console.log("进入")
  if(e.key == "Enter"){
    currentPage = 1; // 如果使用api获取资源
    searchTerm = search.value.toLowerCase();
    updateURLValue();
    imageWrapper.innerHTML="";
    getAPIImages(apiURL_pixels_search).finally(()=>{console.log("API图片搜索完成");});;
    images = document.querySelectorAll(".image-item");
  }
})

loadMoreBtn.addEventListener("click", e => {
  loadMoreBtn.innerText = "Loading...";
  loadMoreBtn.classList.add("disabled");
  currentPage++;
  updateURLValue();
  loadMoreBtn.innerText = "Load More";
  console.log(searchTerm)
  getAPIImages(searchTerm ? apiURL_pixels_search:apiURL_pixels_all)
  .finally(()=>{
    loadMoreBtn.classList.remove("disabled");
    console.log("加载图片更多完成")
  });
})


