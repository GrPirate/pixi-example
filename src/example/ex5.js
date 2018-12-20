import * as PIXI from 'pixi.js'

const { Application, Container, loader, Sprite, Rectangle} = PIXI
const resources = PIXI.loader.resources
const TextureCache = PIXI.utils.TextureCache

export default () => {
  let app = new Application({
    width: 512,
    height: 512,
    antialias: true
  })

  document.body.appendChild(app.view)

  loader
  .add('assets/treasureHunter.json')
  .load(setup)

  let dungeon, explorer, treasure, door, id
  function setup () {
    // 根据纹理地图集框架制作精灵有三种方法

    // 1、通过'TextureCache'直接访问
    let dungeonTexture = TextureCache['dungeon.png']

    dungeon = new Sprite(dungeonTexture)
    app.stage.addChild(dungeon)

    // 2、使用loader`resources`访问纹理
    explorer = new Sprite(resources['assets/treasureHunter.json'].textures['explorer.png'])
    explorer.x = 68

    explorer.y = app.stage.height / 2 - explorer.height / 2
    app.stage.addChild(explorer)

    // 3、为所有纹理地图集创建一个名为“id”的别名
    id = PIXI.loader.resources['assets/treasureHunter.json'].textures
    treasure = new Sprite(id['treasure.png'])

    treasure.x = app.stage.width - treasure.width - 48
    treasure.y = app.stage.height / 2 - treasure.height / 2
    app.stage.addChild(treasure)

    // 制作出口的门
    door = new Sprite(id['door.png'])
    door.position.set(32, 0)
    app.stage.addChild(door)

    // 制作blobs
    let numberOfBlobs = 6
    let spacing = 48
    let xOffset = 150

    for(let i = 0; i < numberOfBlobs; i++) {
      let blob = new Sprite(id['blob.png'])
      let x = spacing * i + xOffset
      let y = randomInit(0, app.stage.height - blob.height)
      blob.position.set(x, y)
      app.stage.addChild(blob)
    }

  }

  function randomInit (min, max) {
    if (min > max) [min, max] = [max, min]
    return Math.floor(Math.random() * (max - min + 1)) + min
  }


}