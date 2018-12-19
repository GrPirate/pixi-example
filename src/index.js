import * as PIXI from 'pixi.js'

let { Application, loader, Sprite } = PIXI

let type = 'WebGL'
if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas'
}
PIXI.utils.sayHello(type)
// 创建PIXI应用
let app = new Application({
  width: 256,
  height: 256,
  antialias: true
})
app.renderer.backgroundColor = 0x061639
app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'
app.renderer.autoResize = true
app.renderer.resize(1280, 720)

document.body.appendChild(app.view)

// 加载一个精灵图
let sprite

loader
.add('./image/cat.png')
.load(function () {
  sprite = new Sprite(loader.resources['./image/cat.png'].texture)
  app.stage.addChild(sprite)
  let num = 0
  let timeId = setInterval(function () {
    console.log(num)
    if (num++ === 9) {
      app.stage.removeChild(sprite)
      clearInterval(timeId)
    }
    sprite.visible = !sprite.visible
  }, 1000)
})

window['VIEW'] = app
