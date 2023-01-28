module.exports = {
    outputDir: __dirname + '/../server/admin',
    publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/',
    pwa: {
      iconPaths: {
       favicon32   : 'favicon32.ico',
       favicon16   : 'favicon32.ico',
       appleTouchIcon: 'favicon32.ico',
       maskIcon   : 'favicon32.ico',
       msTileImage  : 'favicon32.ico'
      }
     },

}