import * as PIXI from 'pixi.js'
export default () => {
  let app = new PIXI.Application({
    width: 1280,
    height: 720,
    antialias: true
  })
  app.renderer.backgroundColor = 0x061639
  document.body.appendChild(app.view)

  PIXI.loader
  .add(['./image/cat.png','./image/mao.png','./image/mouse.png'])
  .on('progress', function (loader, resource) {
    console.log('loading: ', resource.url)
    console.log(`progress: ${loader.progress}%`)
  })
  .load(function () {
    console.log("All files loaded")
  })
}