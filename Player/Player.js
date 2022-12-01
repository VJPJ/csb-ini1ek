/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Left", "./Player/costumes/Left.svg", {
        x: 43.12020492553711,
        y: 45.4082145690918
      }),
      new Costume("Right", "./Player/costumes/Right.svg", {
        x: 43.12020492553711,
        y: 45.4082145690918
      }),
      new Costume("Normal", "./Player/costumes/Normal.svg", {
        x: 43.120195000000024,
        y: 45.408185
      }),
      new Costume("Up", "./Player/costumes/Up.svg", {
        x: 43.12020492553711,
        y: 45.4082145690918
      }),
      new Costume("Right Up", "./Player/costumes/Right Up.svg", {
        x: 43.12020492553711,
        y: 45.4082145690918
      }),
      new Costume("Left Up", "./Player/costumes/Left Up.svg", {
        x: 43.12020492553711,
        y: 45.4082145690918
      })
    ];

    this.sounds = [new Sound("Meow", "./Player/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.xv = -2.686798789024985;
    this.vars.yv = -5;
  }

  *whenGreenFlagClicked() {
    this.costume = "Normal";
    this.vars.xv = -100;
    this.vars.yv = 0;
    this.stage.vars.lifeLeft = 10;
    while (true) {
      if (
        this.keyPressed("right arrow") ||
        (this.mouse.down && this.x < this.mouse.x)
      ) {
        this.vars.xv += 1;
      }
      if (
        this.keyPressed("left arrow") ||
        (this.mouse.down && this.mouse.x < this.x)
      ) {
        this.vars.xv += -1;
        this.costume = "Left";
      }
      this.x += this.vars.xv;
      this.vars.xv = this.vars.xv * 0.9;
      if (this.touching(Color.rgb(0, 0, 0))) {
        this.y += 1;
        this.costume = "Right";
        if (this.touching(Color.rgb(0, 0, 0))) {
          this.y += 1;
          if (this.touching(Color.rgb(0, 0, 0))) {
            this.y += 1;
            if (this.touching(Color.rgb(0, 0, 0))) {
              this.y += 1;
              if (this.touching(Color.rgb(0, 0, 0))) {
                this.y += 1;
                if (this.touching(Color.rgb(0, 0, 0))) {
                  this.x += this.vars.xv * -1;
                  this.y += -5;
                  if (
                    this.keyPressed("up arrow") ||
                    (this.mouse.down && this.mouse.y > this.y)
                  ) {
                    if (this.vars.xv > 0) {
                      this.vars.xv = -10;
                    } else {
                      this.vars.xv = 10;
                    }
                    this.vars.yv = 15;
                  } else {
                    this.vars.xv = 0;
                  }
                }
              }
            }
          }
        }
      }
      this.vars.yv += -1;
      this.y += this.vars.yv;
      if (this.touching(Color.rgb(0, 0, 0))) {
        this.y += this.vars.yv * -1;
        this.vars.yv = 0;
        if (this.keyPressed("up arrow")) {
          this.vars.yv = 13;
          this.costume = "Up";
        }
      }
      this.stage.vars.scrollx += this.x * -1;
      this.stage.vars.scrolly += this.y * -1;
      this.goto(0, 0);
      if (this.touching(Color.rgb(62, 103, 100))) {
        this.broadcast("Next Level");
      }
      if (this.stage.vars.lifeLeft == 0) {
        this.stage.vars.scrollx = 717;
        this.stage.vars.scrolly = 446;
        this.stage.vars.lifeLeft = 100;
        this.broadcast("Go back");
      }
      if (!this.keyPressed("any")) {
        this.costume = "Normal";
      }
      if (this.keyPressed("up arrow") && this.keyPressed("right arrow")) {
        this.costume = "Right Up";
      }
      if (this.keyPressed("up arrow") && this.keyPressed("left arrow")) {
        this.costume = "Left Up";
      }
      yield* this.lifeChange();
      if (this.stage.vars.scrolly > 900) {
        this.stage.vars.scrollx = 717;
        this.stage.vars.scrolly = 446;
        this.stage.vars.lifeLeft = 10;
      }
      yield;
    }
  }

  *lifeChange() {
    if (this.touching(Color.rgb(255, 0, 0))) {
      this.stage.vars.lifeLeft += -0.5;
      this.vars.xv += -2;
    }
  }
}
