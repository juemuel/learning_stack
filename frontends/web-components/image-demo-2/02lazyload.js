export class LazyLoadImages {
  constructor() { }
  static imageOptions = {};
  static observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // 如果不在视窗内，就返回
      if (!entry.isIntersecting) {
        return;
      }
      const image = entry.target;
      LazyLoadImages.lazyLoadImage(image)
      observer.unobserve(image); // 取消关注已加载image
    })
  }, LazyLoadImages.imageOptions);

  static changeSrc(image, src) {
    image.src = src;
    image.removeAttribute('data-src');
  }
  // 懒加载
  static lazyLoadImage(image) {
    var dataSrc = image.getAttribute('data-src'); // 获取图片的data-src属性值
    if (dataSrc) {
      setTimeout(() => { LazyLoadImages.changeSrc(image, dataSrc) }, 300); // 如果data-src存在，则将其赋值给src属性，开始加载图片
    }
  }
  // 监听方案1：IntersectionObserver监听图片，触发懒加载
  static initLazyLoad_IntersectionObserver() {
    LazyLoadImages.observer.disconnect();
    document.querySelectorAll('img[data-src]').forEach((image) => {
      this.observer.observe(image)
    })
  }
  // 监听方案1：Scroll监听图片，触发懒加载
  static initLazyLoad_Scroll() {
    // #1-2 检查可视区域内的图片并进行懒加载
    function checkLazyImages() {
      document.querySelectorAll('img').forEach(function (image) {
        // 获取图片相对于视口顶部的位置
        var imageTop = image.getBoundingClientRect().top;
        // 如果图片进入视口，则进行懒加载
        if (imageTop <= window.innerHeight) {
          LazyLoadImages.lazyLoadImage(image);
        }
      });
    }
    checkLazyImages();
    window.addEventListener('scroll', checkLazyImages);
    window.addEventListener('resize', checkLazyImages);
  }

  static mutationLoad() {
    LazyLoadImages.mtObserver.observe(document.querySelector(".images"), { childList: true, subtree: false });
  }
};
