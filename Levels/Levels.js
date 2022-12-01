/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Levels extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("blank", "./Levels/costumes/blank.svg", { x: 0, y: 0 }),
      new Costume("Level 1", "./Levels/costumes/Level 1.svg", {
        x: 238.71019,
        y: 105.77008
      }),
      new Costume("Level 2", "./Levels/costumes/Level 2.svg", {
        x: 211.5,
        y: 22.207213333332987
      }),
      new Costume("Level 3", "./Levels/costumes/Level 3.svg", {
        x: 213.02326,
        y: 141.76069
      }),
      new Costume("Level 4", "./Levels/costumes/Level 4.svg", {
        x: 240.330095,
        y: 163.72259417603624
      }),
      new Costume("Level 5", "./Levels/costumes/Level 5.svg", {
        x: 241.592405,
        y: 168.04933796875
      }),
      new Costume("Level 6", "./Levels/costumes/Level 6.svg", {
        x: 248.54675,
        y: 139.818175
      }),
      new Costume("Level 7", "./Levels/costumes/Level 7.svg", {
        x: 259.963035,
        y: 136.37388
      }),
      new Costume("Level 8", "./Levels/costumes/Level 8.svg", {
        x: 230.36055440007348,
        y: 129.0486276371111
      }),
      new Costume("End", "./Levels/costumes/End.svg", {
        x: 210.35499467792215,
        y: -107.56165701677423
      }),
      new Costume("Exit open", "./Levels/costumes/Exit open.svg", {
        x: 52.967780000000005,
        y: 53.87388
      })
    ];

    this.sounds = [new Sound("pop", "./Levels/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Go back" },
        this.whenIReceiveGoBack
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.costume = "blank";
    this.size = 400;
    this.costume = "Level 1";
    yield* this.position();
    while (true) {
      this.goto(this.stage.vars.scrollx, this.stage.vars.scrolly);
      yield;
    }
  }

  *position() {
    this.stage.vars.scrollx = 717;
    this.stage.vars.scrolly = 446;
  }

  *whenIReceiveNextLevel() {
    yield* this.position();
    this.costumeNumber += 1;
  }

  *whenIReceiveGoBack() {
    this.costume = "Level 1";
  }
}
