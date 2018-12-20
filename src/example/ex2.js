import * as PIXI from 'pixi.js'

/**
 * pixi loading progress
 */
export default () => {
  let app = new PIXI.Application({
    width: 1280,
    height: 720,
    antialias: true
  })
  app.renderer.backgroundColor = 0x061639
  document.body.appendChild(app.view)

  PIXI.loader
  .add(['assets/cat.png','assets/blob.png','assets/door.png'])
  .on('progress', function (loader, resource) {
    if (!resource.error) {
      console.log('loading: ', resource.url)
      console.log(`progress: ${loader.progress}%`)
    } else {
      console.error(resource.error.message)
    }
  })
  .load(function () {
    console.log("All files loaded")
  })
}