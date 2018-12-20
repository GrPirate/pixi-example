import * as PIXI from 'pixi.js'

/**
 * 精灵图的属性设置
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
  .add('assets/cat.png')
  .load(function () {
    let sprite = new PIXI.Sprite(PIXI.loader.resources['assets/cat.png'].texture)
    app.stage.addChild(sprite)

    // 设置精灵位置和宽高
    sprite.x = 96
    sprite.y = 96
    sprite.position.set(96, 96)
    sprite.width = 120
    sprite.height = 120

    // 设置缩放比例
    sprite.scale.x = 0.5
    sprite.scale.y = 0.5

    sprite.scale.set(2, 2)

    // 旋转
    sprite.rotation = 0.5

    // 锚点 默认为左上角 (0, 1)
    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5
    sprite.anchor.set(0.5, 0.5)

    // 像素点设置原点
    sprite.pivot.set(50, 50)
  })
}