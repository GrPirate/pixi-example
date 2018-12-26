import * as PIXI from 'pixi.js'

export default () => {
  let app = new PIXI.Application({
    width: 512,
    height: 512,
    antialias: true
  })

  document.body.appendChild(app.view)
  app.renderer.backgroundColor = '0x1d58d1'

  let style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fill: "white",
    stroke: '#ff3300',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
  })
  let message = new PIXI.Text('Hello Pixi', style)
  message.position.set(54, 96);
  app.stage.addChild(message)
}