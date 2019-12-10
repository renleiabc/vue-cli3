/* // vue.config.js
const fs = require("fs");
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync("./src/assets/sass/index.scss", "utf-8")
      }
    }
  }
};
 */
