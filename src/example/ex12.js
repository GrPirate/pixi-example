import * as PIXI from 'pixi.js'
import { keyboard } from '../utils'

export default () => {
  let app = new PIXI.Application({
    width: 512,
    height: 512,
    antialias: true
  })

  document.body.appendChild(app.view)

  PIXI.loader
  .add('assets/treasureHunter.json')
  .load(setup)

  let dungeon, explorer, treasure, door, id, message, explorerHit = false, state, gameScene, gameOverScene, healthBar, innerBar, outerBar
  let container = {x: 28, y: 10, width: 488, height: 480}
  let blobs = []
  function setup () {
    // 为纹理地图集frameID创建别名
    id = PIXI.loader.resources['assets/treasureHunter.json'].textures

    // 创建游戏场景和游戏结束场景
    gameScene = new PIXI.Container()
    app.stage.addChild(gameScene)

    gameOverScene = new PIXI.Container()
    app.stage.addChild(gameOverScene)
    gameOverScene.visible = false
    
    // 创建地牢背景纹理
    dungeon = new PIXI.Sprite(id['dungeon.png'])
    gameScene.addChild(dungeon)
    
    // 创建出口纹理图
    door = new PIXI.Sprite(id['door.png'])
    door.position.set(32, 0)
    gameScene.addChild(door)
    
    // 创建玩家角色纹理图
    explorer = new PIXI.Sprite(id['explorer.png'])
    explorer.x = 68
    explorer.y = gameScene.height / 2 - explorer.height / 2
    explorer.vx = 0
    explorer.vy = 0
    gameScene.addChild(explorer)

    // 创建宝藏纹理图
    treasure = new PIXI.Sprite(id['treasure.png'])
    treasure.x = gameScene.width - treasure.width - 48
    treasure.y = gameScene.height / 2 - treasure.height / 2
    gameScene.addChild(treasure)

    // 创造敌方单位纹理图
    let numberOfBlobs = 6
    let spacing = 48
    let xOffset = 150
    let speed = 2
    let direction = 1
    for (let i = 0; i < numberOfBlobs; i++) {

      //Make a blob
      let blob = new PIXI.Sprite(id["blob.png"])
    
      //Space each blob horizontally according to the `spacing` value.
      //`xOffset` determines the point from the left of the screen
      //at which the first blob should be added
      let x = spacing * i + xOffset
    
      //Give the blob a random `y` position
      let y = randomInit(0, app.stage.height - blob.height)
    
      //Set the blob's position
      blob.x = x
      blob.y = y
    
      //Set the blob's vertical velocity. `direction` will be either `1` or
      //`-1`. `1` means the enemy will move down and `-1` means the blob will
      //move up. Multiplying `direction` by `speed` determines the blob's
      //vertical direction
      blob.vy = speed * direction
    
      //Reverse the direction for the next blob
      direction *= -1
    
      //Push the blob into the `blobs` array
      blobs.push(blob)
    
      //Add the blob to the `gameScene`
      gameScene.addChild(blob)
    }

    // 创建血槽
    healthBar = new PIXI.DisplayObjectContainer()
    healthBar.position.set(app.stage.width - 170, 4)
    gameScene.addChild(healthBar)

    // 绘制血槽黑色矩形
    innerBar = new PIXI.Graphics()
    innerBar.beginFill(0x000000)
    innerBar.drawRect(0, 0, 128, 8)
    innerBar.endFill()
    healthBar.addChild(innerBar)

    // 绘制血槽红色矩形
    outerBar = new PIXI.Graphics()
    outerBar.beginFill(0xFF3300)
    outerBar.drawRect(0, 0, 128, 8)
    outerBar.endFill()
    healthBar.addChild(outerBar)
    healthBar.outer = outerBar;
    
    // 为游戏添加一些信息文本
    let style = new PIXI.TextStyle({
      fontFamily: "Futura",
      fontSize: 64,
      fill: "white"
    })
    message = new PIXI.Text("The End!", style)
    message.x = 120
    message.y = app.stage.height / 2 - 32
    gameOverScene.addChild(message)
    // 分配玩家角色的键盘控制器 
    let left = keyboard(37)
    let up = keyboard(38)
    let right = keyboard(39)
    let down = keyboard(40)

    left.press = () => {
      explorer.vx = -5
      explorer.vy = 0
    }
  
    left.release = () => {
      if (!right.isDown && explorer.vy === 0) {
        explorer.vx = 0
      }
    }
    
    //Up
    up.press = () => {
      explorer.vy = -5
      explorer.vx = 0
    };
    up.release = () => {
      if (!down.isDown && explorer.vx === 0) {
        explorer.vy = 0
      }
    }
  
    //Right
    right.press = () => {
      explorer.vx = 5
      explorer.vy = 0
    };
    right.release = () => {
      if (!left.isDown && explorer.vy === 0) {
        explorer.vx = 0
      }
    };
  
    //Down
    down.press = () => {
      explorer.vy = 5
      explorer.vx = 0
    };
    down.release = () => {
      if (!up.isDown && explorer.vx === 0) {
        explorer.vy = 0
      }
    }

    // 设置游戏状态
    state = play;

    // 开始游戏循环
    app.ticker.add(delta => gameLoop(delta));
  }

  function randomInit (min, max) {
    if (min > max) [min, max] = [max, min]
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function play(delta) {
    // 移动探险家（玩家角色）并将其包含在地牢中。
    explorer.x += explorer.vx;
    explorer.y += explorer.vy;
    contain(explorer, container)

    // 移动小水珠怪物 
    blobs.forEach((blob) => {
      // 移动怪物 
      blob.y += blob.vy
    
      // 检查BLOB的屏幕边界 
      let blobHitsWall = contain(blob, container)
    
      // 如果怪物移动到舞台的顶部或底部，倒转它的方向。 
      if (blobHitsWall === "top" || blobHitsWall === "bottom") {
        blob.vy *= -1
      }
    
      // 碰撞检测。如果有任何敌人碰触探险者，将explorerHit设置为true
      if(hitTestRectangle(explorer, blob)) {
        explorerHit = true
      }
    })
    // 检查BLOB和资源管理器之间的碰撞。 
    if(explorerHit) {
      explorerHit = false
      // 使探险家半透明
      explorer.alpha = 0.5;
    
      // 将血槽内矩形的宽度减少1个像素 
      healthBar.outer.width -= 1;
    
    } else {
    
      // 如果未命中，则使探险家完全不透明(不透明)。 
      explorer.alpha = 1;
    }

    // 检查探险者和宝藏之间的碰撞。
    if (hitTestRectangle(explorer, treasure)) {
      treasure.x = explorer.x + 8;
      treasure.y = explorer.y + 8;
    }

    // 检查门和宝藏之间的碰撞。
    if (hitTestRectangle(treasure, door)) {
      state = end;
      message.text = "You won!";
    }

    // 决定比赛是赢了还是输了 
    if (healthBar.outer.width < 0) {
      state = end;
      message.text = "You lost!";
    }

    // 当游戏结束时，将游戏“State”改为“End” 
  }

  function contain (sprite, container) {
    let collision = undefined

    // left
    if (sprite.x < container.x) {
      sprite.x = container.x
      collision = 'left'
    }

    // top
    if (sprite.y < container.y) {
      sprite.y = container.y
      collision = 'top'
    }

    //Right
    if (sprite.x + sprite.width > container.width) {
      sprite.x = container.width - sprite.width;
      collision = "right";
    }
  
    //Bottom
    if (sprite.y + sprite.height > container.height) {
      sprite.y = container.height - sprite.height;
      collision = "bottom";
    }
    return collision
  }

  function hitTestRectangle (r1, r2) {
    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

      //A collision might be occuring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {

        //There's definitely a collision happening
        hit = true;
      } else {

        //There's no collision on the y axis
        hit = false;
      }
    } else {

      //There's no collision on the x axis
      hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
  }

  function gameLoop(delta){

    //Update the current game state:
    state(delta);
  }

  function end() {
    gameScene.visible = false;
    gameOverScene.visible = true;
  }
}