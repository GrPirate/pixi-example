import * as PIXI from 'pixi.js'
import { keyboard } from '../utils'

/**
 * 键盘移动精灵
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

  let cat, state
  function setup () {
    cat = new PIXI.Sprite(PIXI.loader.resources['assets/cat.png'].texture)

    app.stage.addChild(cat)
    cat.y = 0;
    cat.vx = 5;
    cat.vy = 5;
    console.log(cat.width, cat.height)

    let left = keyboard(37)
    let up = keyboard(38)
    let right = keyboard(39)
    let down = keyboard(40)

    left.press = () => {
      //Change the cat's velocity when the key is pressed
      cat.vx = -5
      cat.vy = 0
    }
  
    //Left arrow key `release` method
    left.release = () => {
      //If the left arrow has been released, and the right arrow isn't down,
      //and the cat isn't moving vertically:
      //Stop the cat
      if (!right.isDown && cat.vy === 0) {
        cat.vx = 0
      }
    }
    
    //Up
    up.press = () => {
      cat.vy = -5
      cat.vx = 0
    };
    up.release = () => {
      if (!down.isDown && cat.vx === 0) {
        cat.vy = 0
      }
    }
  
    //Right
    right.press = () => {
      cat.vx = 5
      cat.vy = 0
    };
    right.release = () => {
      if (!left.isDown && cat.vy === 0) {
        cat.vx = 0
      }
    };
  
    //Down
    down.press = () => {
      cat.vy = 5
      cat.vx = 0
    };
    down.release = () => {
      if (!up.isDown && cat.vx === 0) {
        cat.vy = 0
      }
    }

    state = auto

    app.ticker.add(delta => gameLoop(delta))
  }

  function gameLoop (delta) {
    state(delta)
    
  }

  /**
   * 自动运动
   * @param {*} delta 
   */
  function auto (delta) {
    if (cat.x < 0) {
      cat.vx = 5
      cat.vy = 5
    } else if (cat.x > 448) {
      cat.vx = -5
      cat.vy = -5
    }
    cat.x += cat.vx
    cat.y += cat.vy
  }

  function play (delta) {
    cat.x = cat.x + cat.vx < 0 ? 0 : cat.x + cat.vx > 448 ? 448 : cat.x + cat.vx
    cat.y = cat.y + cat.vy < 0 ? 0 : cat.y + cat.vy > 448 ? 448 : cat.y + cat.vy
  }
}
