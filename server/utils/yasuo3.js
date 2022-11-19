var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var images = require("images");

//解析需要遍历的文件夹，我这以E盘根目录为例  
var filePath = path.join(__dirname, "../utils/uploads-bak/")

function minImages(filePath) {
  images(filePath+'00a617a91f87a6d162ffcace06289d10.jpg').save('uploads-bak/'+'00000.jpg',{quality: 50})
}
// var filedir = path.join(filePath, filename);
// console.log(filename, filedir)
// images(filedir).save('uploads-bak/'+filename,{quality: 50})
// console.log('----------压缩' + num)
// num++

minImages(filePath)