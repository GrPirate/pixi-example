import * as PIXI from 'pixi.js'

/**
 * 精灵分组
 */
export default () => {
  let app = new PIXI.Application({
    width: 512,
    height: 512,
    antialias: true
  })

  document.body.appendChild(app.view)

  PIXI.loader
  .add('assets/animals.json')
  .load(setup)

  function setup () {
    let id = PIXI.loader.resources['assets/animals.json'].textures

    let cat = new PIXI.Sprite(id['cat.png'])
    cat.position.set(16, 16);

    //The hedgehog
    let hedgehog = new PIXI.Sprite(id["hedgehog.png"]);
    hedgehog.position.set(32, 32);
    
    //The tiger
    let tiger = new PIXI.Sprite(id["tiger.png"]);
    tiger.position.set(64, 64);

    let animals = new PIXI.Container()

    animals.addChild(cat)
    animals.addChild(hedgehog)
    animals.addChild(tiger)

    app.stage.addChild(animals)

    animals.position.set(64, 64)
    // animals.width = 200
    // animals.height = 200
    // 计算精灵全局位置
    let catPosition = cat.parent.toGlobal(cat.position)
    console.log('cat position relative to the stage: ' + catPosition)

    let tigerX = tiger.getGlobalPosition().x
    let tigerY = tiger.getGlobalPosition().y

    console.log('globalxy: ' + tigerX, tigerY)

    // 精灵间的相对距离
    let tigerToHedghogX = tiger.toLocal(tiger.position, hedgehog).x
    let tigerToHedghogY = tiger.toLocal(tiger.position, hedgehog).y
    
    console.log(tigerToHedghogX, tigerToHedghogY)
    
    console.log(animals.children)
  }
}