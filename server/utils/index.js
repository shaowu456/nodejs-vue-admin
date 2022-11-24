var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var images = require("images");

//解析需要遍历的文件夹，我这以E盘根目录为例  
var filePath = path.join(__dirname, "uploads2/")

function minImages(filePath) {
  !fs.existsSync('uploads-bak2') && fs.mkdirSync('uploads-bak2', (err)=>{
    if(err){
      throw err;
    }else{
        console.log('ok!');
    }
  });
  console.log('-----bak文件夹创建成功')
  // 读取源文件夹，将其压缩生成新图片到目标文件夹
  fs.readdir(filePath, async function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      let num = 1
      console.log('1111', files)
      //遍历读取到的文件列表  
      for(let filename of files){
        var filedir = path.join(filePath, filename);
        try {
          await createMinImage(filedir, filename)
          if(num%200==0){
            console.log('----------完成', num)
          }
          num++  
        } catch (error) {
          console.log('XXXXX---'+error)
          console.log('XXXXX-------压缩失败'+filename)
        }
      }
      console.log('--------全部完成----------',num)
    }
  });
}

let createMinImage = (filedir, filename) =>{
  return new Promise((resolve, reject)=>{
    images(filedir).saveAsync('uploads-bak2/'+filename+'.jpg',{quality: 20}, function(e){console.log(e)}, function(e){
      resolve(e)
    })
  })
}
minImages(filePath)