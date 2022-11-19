
var fs = require('fs');  
var path = require('path');  
  
//解析需要遍历的文件夹，我这以E盘根目录为例  
var filePath =  path.join(__dirname, "./uploads/")
  
/** 
 * 文件遍历方法 
 * @param filePath 需要遍历的文件路径 
 */  
function fileDisplay(filePath){  
  //根据文件路径读取文件，返回文件列表  
  fs.readdir(filePath,function(err,files){
      if(err){  
          console.warn(err)  
      }else{
          //遍历读取到的文件列表  
          files.forEach(function(filename){
              //获取当前文件的绝对路径  
              var filedir = path.join(filePath,filename);
              //根据文件路径获取文件信息，返回一个fs.Stats对象
              console.log(filename, filedir)
              fs.rename(filePath+filename, filePath+filename+'.jpg', err=>{
                if(err){
                  console.log(err);
                  return
                }
              })
          });  
      }  
  });
}

//调用文件遍历方法然后更改名字 
// fileDisplay(filePath);

// fs.rename()

// fs.stat("235.jpg",(err, data) => {
//   console.log(data);
// })
var images = require("images");
images("555.jpg") //Load image from file 
 //加载图像文件
 .save("555-bak.jpg", { //Save the image to a file, with the quality of 50
 quality : 50 //保存图片到文件,图片质量为50
}); 
//支持png/jpeg/gif三种格式输入。目前支持设置JPG输出图像质量，即：压缩后格式需为jpg

