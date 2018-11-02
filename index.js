#!/usr/bin/env node

var fs = require("fs");

/*
Component must be called with {name of component} {path of component}

Name must be there

Path will default to current directory if not inputted
*/

// get Name
const nameArg = process.argv[2];
console.log(nameArg);
// get path Arg
let pathArg = process.argv[3] || ".";
console.log(pathArg);

// check for '/' at the end
if (pathArg.substr(-1) === "/") pathArg = pathArg.slice(0, pathArg.length - 1);

const path = pathArg + "/" + nameArg + ".js";

// create new file data
const newFile =
  `import React, { Component } from "react";\n` +
  `class ${nameArg} extends Component {\n` +
  `render() {\n` +
  `return <div>${nameArg}</div>;\n` +
  "}\n" +
  "}\n" +
  `export default ${nameArg}`;

// check for path existence
if (!fs.existsSync(path)) {
  const pathArr = pathArg.split("/");
  let currPath = "";
  pathArr.forEach(entry => {
    currPath += entry;
    if (!fs.existsSync(currPath)) {
      fs.mkdirSync(currPath);
    }
    currPath += "/";
  });
}
// else create path

// write file
fs.writeFile(path, newFile, err => {
  if (err) throw err;

  console.log("file written successfully");
});
