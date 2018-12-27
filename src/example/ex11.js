import * as PIXI from 'pixi.js'
import { keyboard } from '../utils'

/**
 * 碰撞检测
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

  let cat, state, box, message
  function setup () {
    message = new PIXI.Text('No collision...', new PIXI.TextStyle({fill: 'white'}))
    app.stage.addChild(message)

    box = new PIXI.Graphics()
    box.beginFill(0x66CCFF)
    box.drawRect(0, 0, 64, 64)
    box.endFill()
    box.x = 170
    box.y = 170
    app.stage.addChild(box)

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

    state = play

    app.ticker.add(delta => gameLoop(delta))
  }

  function gameLoop (delta) {
    state(delta)
    
  }

  function play (delta) {
    cat.x = cat.x + cat.vx < 0 ? 0 : cat.x + cat.vx > 448 ? 448 : cat.x + cat.vx
    cat.y = cat.y + cat.vy < 0 ? 0 : cat.y + cat.vy > 448 ? 448 : cat.y + cat.vy
    if (hitTestRectangle(cat, box)) {

      //if there's a collision, change the message text
      //and tint the box red
      message.text = "hit!";
      box.tint = 0xff3300;
  
    } else {
  
      //if there's no collision, reset the message
      //text and the box's color
      message.text = "No collision...";
      box.tint = 0xccff99;
    }
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

}