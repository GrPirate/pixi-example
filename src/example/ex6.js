import * as PIXI from 'pixi.js'

/**
 * 移动精灵
 */
export default () => {
  let app = new PIXI.Application({
    width: 512,
    height: 512,
    antialias: true
  })

  document.body.appendChild(app.view)

  PIXI.loader
  .add('assets/cat.png')
  .load(setup)

  let cat
  function setup () {
    cat = new PIXI.Sprite(PIXI.loader.resources['assets/cat.png'].texture)
    app.stage.addChild(cat)
    cat.y = 96

    cat.vx = 0
    cat.vy = 0

    app.ticker.add(delta => gameLoop(delta))
  }

  function gameLoop (delta) {
    // requestAnimationFrame(gameLoop)
    cat.vx = 1
    cat.vy = 1
    cat.x += cat.vx + delta
    cat.y += cat.vy + delta
  }
}