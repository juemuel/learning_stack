<template>
  <div id="app">
    <main>
      <div class="search-box">
        <input
          id=""
          v-model="query"
          name=""
          type="text"
          class="search-bar"
          @keypress="fetch_weather"
        >
      </div>
      <div
        v-if="$data.weather"
        class="weather-wrap"
      >
        <div class="location-box">
          <div class="location">
            {{ location_name }}, 中国
          </div>
          <div class="date">
            12日 三月 2023
          </div>
        </div>
        <div class="weather-box">
          <div class="temp">
            {{ weather.temp }}°c
          </div>
          <div class="weather-image">
            <div class="weather">
              {{ weather.text }}
            </div>
            <div class="weather-description">
              ～～～
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    // 城市搜素：https://dev.qweather.com/docs/api/geoapi/city-lookup/
    // https://geoapi.qweather.com/v2/city/lookup?location=beij&key=1662165915da449bacb657b303e55d48
    // 实时天气搜索：https://dev.qweather.com/docs/api/weather/weather-now/
    // https://devapi.qweather.com/v7/weather/now?location=101010100&key=1662165915da449bacb657b303e55d48
    return {
      api_key: '1662165915da449bacb657b303e55d48',
      query:``,
      location_name:'',
      location_code: '',
      weather: null,
      geo_url_base: `https://geoapi.qweather.com/v2/city/lookup`,
      weather_url_base: `https://devapi.qweather.com/v7/weather/now`,
    }
  },
  methods: {
    async fetch_weather(e) {
      if(e.key !== "Enter") return;
      try{
        const geoUrl = `${this.geo_url_base}?location=${this.query}&key=${this.api_key}`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (geoData && geoData.location && geoData.location.length > 0) {
          const locationName = geoData.location[0].name;
          const locationCode = geoData.location[0].id;

          const weatherUrl = `${this.weather_url_base}?location=${locationCode}&key=${this.api_key}`;
          const weatherRes = await fetch(weatherUrl);
          const weatherData = await weatherRes.json();

          this.setLocationInfo({ location: locationName, location_code: locationCode });
          this.setWeatherInfo(weatherData);
        } else {
          throw new Error("No location found");
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log(this.location_name, this.location_code, this.weather);
      }

      // Promise fetch 写法
      // if (e.key === "Enter") {
      //   fetch(`${this.geo_url_base}?location=${this.query}&key=${this.api_key}`)
      //     .then((res) => res.json())
      //     .then((data) => {
      //       // console.log("related location codes",data)
      //       if (data) {this.setLocationInfo({ location: data.location[0].name, location_code: data.location[0].id});}
      //     })
      //     .then(() => {
      //       fetch(`${this.weather_url_base}?location=${this.location_code}&key=${this.api_key}`)
      //         .then((res) => res.json())
      //         .then((data) => {
      //           this.setWeatherInfo(data);
      //         })
      //         .catch(e => console.log(e));
      //     })
      //     .catch(e => console.log(e))
      //     .finally(()=>{
      //       console.log(this.location_name,this.location_code,this.weather)
      //     });
      // }
    },
    setLocationInfo(data){
      this.location_name = data.location;
      this.location_code = data.location_code;
    },
    setWeatherInfo(data){
      this.weather = {};
      this.weather.temp = data.now.temp;
      this.weather.text = data.now.text
    },
  }

}
</script>
<style>
/* CSS 基本配置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
}

/* 一、主体结构区 */
/* App 背景图 */
#app {
  background-image: url("assets/back.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

/* main 设置视窗高度并添加渐变色 */
main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(209, 45, 45, 0.25), rgba(186, 10, 10, 0.75));
}

/* 二、搜索框区域 */
/* 搜索框：输入框div */
.search-box {
  width: 100%;
  margin-bottom: 30px;
}

/* 输入框input */
.search-box .search-bar {
  display: block;

  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  /* 去除不同浏览器下的默认样式、去边框、去焦点轮廓 */
  appearance: none;
  border: none;
  outline: none;
  /* 设置透明背景色 */
  background: none;
  background-color: rgba(255, 255, 255, 0.2);

  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px 10px 10px;

  transition: 0.4s;
}

/* 自定义焦点效果 */
.search-box .search-bar:focus {
  background-color: rgba (255, 255, 255, 0.75);
  box-shadow: Opx Opx 16px rgba(0, 0, 0, 0.5);
  border-radius: 6px 0px 16px 0px;
}

/* 三、信息区域 */
.location-box .location {
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #FFFFFF;
  font-size: 102px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  /* 透明背景效果+阴影 */
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 500;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.weather-box .weather-description {
  color: #FFFFFF;
  font-size: 10px;
  font-weight: 300;
  font-style: italic;
}

.weather-box .weather-image {
  position: center;
}
</style>
