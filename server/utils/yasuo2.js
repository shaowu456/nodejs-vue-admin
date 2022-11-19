
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var images = require("images");

//解析需要遍历的文件夹，我这以E盘根目录为例  
var filePath = path.join(__dirname, "../uploads2/")

function minImages(filePath) {
  !fs.existsSync('uploads-bak') && fs.mkdirSync('uploads-bak', (err)=>{
    if(err){
      throw err;
    }else{
        console.log('ok!');
    }
  });
  console.log('-----bak文件夹创建成功')
  // 读取源文件夹，将其压缩生成新图片到目标文件夹
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      let num = 1
      // console.log('1111', files)
      //遍历读取到的文件列表  
      files.forEach(function (filename) {
        //获取当前文件的绝对路径  
        var filedir = path.join(filePath, filename);
        // console.log(filename, filedir)
        try {
          // 换名字 + _bak.jpg 
          // fs.renameSync(filePath+filename, filePath+filename+'_bak.jpg', err=>{
          //   if(err){
          //     console.log(err);
          //     return
          //   }
          // })
          // console.log('----------换名成功', filename, filedir+'_bak.jpg')
          images(filedir).save('uploads-bak/'+filename+'.jpg',{quality: 50})
          // images(filedir).save(filePath+filename+'.jpg',{quality: 50})
          // console.log('----------压缩成功', filename + '  ' + num)
          // fs.unlinkSync(filedir)
          // console.log('---------源文件删除', filename)
          // fs.renameSync(filedir+'.jpg', filedir)
          // console.log('---------更名成功-完成', filename)
          if(num%200==0){
            console.log('----------完成', num)
          }
          num++
        } catch (error) {
          console.log('XXXXX---'+error)
          console.log('XXXXX-------压缩失败'+filename)
        }
      });
      console.log('--------完成----------')
    }
  });
}
// var filedir = path.join(filePath, filename);
// console.log(filename, filedir)
// images(filedir).save('uploads-bak/'+filename,{quality: 50})
// console.log('----------压缩' + num)
// num++

minImages(filePath)