import * as PIXI from 'pixi.js'

/**
 * 使用PIXI绘制几何图形
 */
export default () => {
  let app = new PIXI.Application({
    width: 512,
    height: 512,
    antialias: true
  })

  document.body.appendChild(app.view)

  // 矩形
  let rectangle = new PIXI.Graphics()
  rectangle.beginFill(0x66CCFF)
  rectangle.lineStyle(4, 0xFF3300, 1)
  rectangle.drawRect(0, 0, 64, 64)
  rectangle.endFill()
  rectangle.x = 170
  rectangle.y = 170
  app.stage.addChild(rectangle)

  // 圆形
  let circle = new PIXI.Graphics()
  circle.beginFill(0x9966FF)
  circle.drawCircle(0, 0, 32)
  circle.endFill()
  circle.x = 64
  circle.y = 130
  app.stage.addChild(circle)

  // 椭圆
  let ellipse = new PIXI.Graphics()
  ellipse.beginFill(0xFFFF00)
  ellipse.drawEllipse(0, 0, 50, 20)
  ellipse.endFill()
  ellipse.x = 180
  ellipse.y = 130
  app.stage.addChild(ellipse)

  // 圆角矩阵
  let roundBox = new PIXI.Graphics()
  roundBox.lineStyle(4, 0x99CCFF, 1)
  roundBox.beginFill(0xFF9933)
  roundBox.drawRoundedRect(0, 0, 84, 36, 10)
  roundBox.endFill()
  roundBox.x = 48
  roundBox.y = 190
  app.stage.addChild(roundBox)

  // 线段
  let line = new PIXI.Graphics();
  line.lineStyle(4, 0xFFFFFF, 1);
  line.moveTo(0, 0);
  line.lineTo(80, 50);
  line.x = 32;
  line.y = 32;
  app.stage.addChild(line);

  // 多边形
  let path = [
    -32, 64,
    32, 64,
    0, 0
  ]
  let triangle = new PIXI.Graphics()
  triangle.beginFill(0x66FF33)
  triangle.drawPolygon(path)
  triangle.endFill()
  triangle.x = 180
  triangle.y = 22
  app.stage.addChild(triangle)
}