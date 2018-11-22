import Vue from "vue";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const about = require.context(
  "./About",
  true,
  /\.vue$/

  //找到components文件夹下以.vue命名的文件
);
const home = require.context(
  "./Home",
  true,
  /\.vue$/
  //找到components文件夹下以.vue命名的文件
);
const simple = require.context(
  "./simple",
  true,
  /\.vue$/
  //找到components文件夹下以.vue命名的文件
);

function components(params) {
  params.keys().forEach(fileName => {
    const componentConfig = params(fileName);
    const componentName = capitalizeFirstLetter(
      fileName.replace(/^\.\//, "").replace(/\.\w+$/, "")
      //因为得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名
    );
    Vue.component(componentName, componentConfig.default || componentConfig);
  });
}
// home文件下的插件
components(home);
// about文件下的插件
components(about);
// about文件下的插件
components(simple);
