const path = require("path");

const createPathHtml = (page) => path.join(__dirname, "../views", `${page}.ejs`);

module.exports = createPathHtml