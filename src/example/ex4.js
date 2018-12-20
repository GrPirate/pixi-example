import * as PIXI from 'pixi.js'

// 创建对象别名
const TextureCache = PIXI.utils.TextureCache
const Rectangle = PIXI.Rectangle
const Sprite = PIXI.Sprite
const renderer = PIXI.renderer

/**
 * 使用雪碧图
 */
export default () => {
  let app = new PIXI.Application({
    width: 256,
    height: 256,
    antialias: true
  })

  document.body.appendChild(app.view)

  PIXI.loader
  .add('assets/tileset.png')
  .load(setup)

  function setup () {
    let texture = TextureCache['assets/tileset.png']

    // 创建一个矩形对象，定义他的位置和大小截取雪碧图来创建精灵的纹理
    let rectangle = new Rectangle(192, 128, 64, 64)

    // 告诉纹理使用那个矩形部分 
    texture.frame = rectangle

    // 从纹理创建精灵 
    let rocket = new Sprite(texture)

    rocket.position.set(62, 32)

    app.stage.addChild(rocket)

    renderer.render(stage)

  }

}