/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Coins extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Blank", "./Coins/costumes/Blank.svg", { x: 0, y: 0 }),
      new Costume("Level 1", "./Coins/costumes/Level 1.svg", {
        x: 123.27834894894896,
        y: -65.07099851351356
      }),
      new Costume("Level 2", "./Coins/costumes/Level 2.svg", {
        x: -132.03697499999998,
        y: -269.5
      }),
      new Costume("Level 3", "./Coins/costumes/Level 3.svg", {
        x: -271.67662463963984,
        y: -253.74275716145956
      }),
      new Costume("Level 4", "./Coins/costumes/Level 4.svg", {
        x: 16.611666006005976,
        y: 130.64162800300298
      })
    ];

    this.sounds = [new Sound("pop", "./Coins/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Go back" },
        this.whenIReceiveGoBack
      )
    ];
  }

  *whenIReceiveNextLevel() {
    yield* this.position();
    this.visible = true;
    this.costumeNumber += 1;
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.costume = "Blank";
    this.costume = "Level 1";
    yield* this.position();
    while (true) {
      this.goto(this.stage.vars.scrollx, this.stage.vars.scrolly);
      if (this.touching(this.sprites["Player"].andClones())) {
        this.visible = false;
        this.stage.vars.lifeLeft += 5;
      }
      if (this.stage.vars.lifeLeft == 0) {
        this.visible = true;
      }
      yield;
    }
  }

  *position() {
    this.stage.vars.scrollx = 717;
    this.stage.vars.scrollx = 446;
  }

  *whenIReceiveGoBack() {
    this.costume = "Level 1";
  }
}
