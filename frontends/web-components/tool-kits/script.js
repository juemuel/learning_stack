// 一、文件上传
const uploadForm = document.querySelector(".upload-form"),
    uploadInput = uploadForm.querySelector(".upload-input"),
    progressArea = document.querySelector(".progress-area"),
    uploadedArea = document.querySelector(".uploaded-area"),
    uploadText = document.querySelector(".upload-form p");
let uploadFile = null;
//#1. 拖拽监听+drop取出file
uploadForm.addEventListener("dragover",(event)=>{
    event.preventDefault();
    uploadForm.classList.add("active");
    console.log(uploadText.textContent, uploadText.innerText, uploadText.innerHTML)
    uploadText.textContent="请释放文件";
})
uploadForm.addEventListener("dragleave",()=>{
    uploadForm.classList.remove("active");
    uploadText.textContent="点击选择 或 拖拽文件 上传";
})
uploadForm.addEventListener("drop",(event)=>{
    event.preventDefault();
    uploadForm.classList.remove("active");
    uploadText.textContent="点击选择 或 拖拽文件 上传";
    uploadFile = event.dataTransfer.files[0];
    checkFileToServer(uploadFile);
})

//#2. click+input监听file
uploadForm.addEventListener("click",()=>{
    uploadInput.click();
})
uploadInput.onchange = ({target}) =>{
    uploadFile = target.files[0];
    checkFileToServer(uploadFile);
}
function checkFileToServer(uploadFile){
    if(uploadFile){
        let fileName = uploadFile.name;
        if(fileName.length >= 12){
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0,8)+ "..." + splitName[1];
            console.log("太长了，我改名了！",fileName)
        }
        uploadFile_node(fileName);
    }
}
function uploadFile_node(fileName){
    let xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:8989/upload/");
    xhr.upload.addEventListener("progress",({loaded,total})=>{
        let fileLoaded = Math.floor((loaded/total)*100);
        let fileTotal = Math.floor(total/1000);
        console.log(fileLoaded,fileTotal)
        let fileSize = (fileTotal < 1024)? fileTotal + " KB": (fileLoaded / (1024 * 1024)).toFixed(2) + " MB";
        let progressHTML = `<li class="row">
                                <i class="fas fa-file-alt"></i>
                                <div class="content">
                                    <div class="details">
                                        <span class="name">${fileName} × Uploading</span>
                                        <span class="percent">${fileLoaded}%</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress" style="width:${fileLoaded}%"></div>
                                    </div>
                                </div>
                            </li>`;
        uploadedArea.classList.add("onprogress");
        progressArea.innerHTML = progressHTML;
        if(loaded == total){
            progressArea.innerHTML = "";
            let uploadedHTML = `<li class="row">
                                    <div class="content">
                                        <i class="fas fa-file-alt"></i>
                                        <div class="details">
                                            <span class="name">${fileName} × Uploaded</span>
                                            <span class="size">${fileSize}</span>
                                        </div>
                                    </div>
                                    <i class="fas fa-check"></i>
                                </li>`;
            uploadedArea.classList.remove("onprogress");
            uploadedArea.insertAdjacentHTML("afterbegin",uploadedHTML);
        }
    });
    // const formData = new FormData();
    let data = new FormData();
    data.append('file', uploadFile);
    xhr.send(data);
}

// 二、文件下载
let fileDownload = document.querySelector(".download-input");
let downloadBtn = document.querySelector(".download-btn");
let urlDownloadInput = document.querySelector(".download-input");
const urlKeyUpValidate = () =>{
    // 每次松开按键，判断如果没有value，就disabled
    downloadBtn.classList.toggle("disabled", !urlDownloadInput.value);
}
function fetchFile(url){
    console.log("fetch",url)
    fetch(url).then(res => res.blob()).then(file=>{
        console.log(file);
        const a = document.createElement("a");
        // a.download设置下载链接最后/的名称，可以根据url修改、也可以用时间戳
        // a.download = url.replace(/^.*[\\\/]/,'');
        a.download = new Date().getTime();
        a.href = URL.createObjectURL(file);
        a.click();
        downloadBtn.innerText = "Download File";
        URL.revokeObjectURL(a.href);
    }).catch(()=>{
        alert("Failed to download file~");
        downloadBtn.innerText = "Download File";
    })
}
downloadBtn.addEventListener("click",e=>{
    downloadBtn.innerText = "Downloading file";
    console.log("click",fileDownload.value)
    fetchFile(fileDownload.value);
});
urlDownloadInput.addEventListener("keyup",urlKeyUpValidate);

// 三、验证码
const captchaTextBox = document.querySelector(".captcha-box input");
const refreshCaptchaBtn = document.querySelector(".refresh-captcha-btn");
const captchaInputBox = document.querySelector(".captcha-input input");
const message = document.querySelector(".message");
const submitBtn = document.querySelector(".submit-div .jue-long-btn");

// console.log(captchaTextBox,refreshCaptchaBtn,captchaInputBox,message,submitBtn)
let captchaText = null;

// 生产验证码
const generateCaptcha = () =>{
    let randomString = Math.random().toString(36).substring(2,7);
    let randomStringArray = randomString.split("");
    // 大小写变换
    let changeString = randomStringArray.map((char)=>(Math.random() > 0.5 ? char.toUpperCase():char));
    captchaText = changeString.join("");
    console.log(randomStringArray);
    console.log(captchaText);
    captchaTextBox.value = captchaText;
}
// 首次生成验证码
generateCaptcha();
// 验证码刷新
const refreshCaptchaBtnClick = () =>{
    generateCaptcha();
    captchaInputBox.value="";
    captchaKeyUpValidate();
}
const captchaKeyUpValidate = () =>{
    // 每次松开按键，判断如果没有value，就disabled
    submitBtn.classList.toggle("disabled", !captchaInputBox.value);
    // 当输入框没有值时，则将message去掉
    if(!captchaInputBox.value) message.classList.remove("active");
}
const submitBtnClick = () =>{
    captchaText = captchaText.split("").filter((char)=> char !== " ").join("");
    message.classList.add("active");
    console.log(captchaInputBox.value === captchaText,captchaInputBox.value,captchaText)
    if(captchaInputBox.value === captchaText){
        message.innerText = "输入验证码正确";
        message.style.color = "#826afb";
    }else{
        message.innerText = "输入验证码错误";
        message.style.color = "#ff5050";
    }
}
refreshCaptchaBtn.addEventListener("click",refreshCaptchaBtnClick);
captchaInputBox.addEventListener("keyup",captchaKeyUpValidate);
submitBtn.addEventListener("click",submitBtnClick);

// 四、随机颜色生成器
const colorList = document.querySelector(".color-list");
const refreshColorBtn = document.querySelector(".refresh-color-btn");
const generateColor = () =>{
    colorList.innerHTML = "";
    let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    randomHex = `#${randomHex.padStart(6, "0")}`;

    const color = document.createElement("li");
    color.classList.add("color");
    color.innerHTML = `<div class="rect-box" style="background: ${randomHex}"></div>
                       <span class="hex-value">${randomHex}</span>`;
    color.addEventListener("click",()=>copyColor(color,randomHex));
    colorList.appendChild(color);
}
generateColor();
const copyColor = (elem, hexVal) =>{
    const colorElement = elem.querySelector(".hex-value");
    navigator.clipboard.writeText(hexVal).then(()=>{
        colorElement.innerText = "Copied";
        setTimeout(()=>colorElement.innerText = hexVal, 1000);// 1s后复原
    }).catch(()=> alert("复制失败！"));
}
refreshColorBtn.addEventListener("click", generateColor);

// 五、QRCode 生成器
const qrcGWrapper = document.querySelector("#qrc-generator"),
qrcGInput = document.querySelector(".qrc-generator-input"),
qrcGBtn = document.querySelector(".qrc-generator-btn"),
qrcGImg = document.querySelector(".qrc-generator-preview img");
let preValue;

qrcGBtn.addEventListener("click",()=>{
    let qrcValue = qrcGInput.value.trim();
    if(!qrcValue || preValue === qrcValue) return;
    preValue = qrcValue;
    qrcGBtn.innerText = "生成中...";
    qrcGImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrcValue}`;
    qrcGImg.addEventListener("load",()=>{
        qrcGWrapper.classList.add("active");
        qrcGBtn.innerText = "生成";
    });
});

qrcGInput.addEventListener("keyup",()=>{
    if(!qrcGInput.value.trim()){
        qrcGWrapper.classList.remove("active");
        preValue="";
    }
})
