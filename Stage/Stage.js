/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 281.9630432128906,
        y: 182.81817626953122
      }),
      new Costume("Space", "./Stage/costumes/Space.png", { x: 480, y: 360 }),
      new Costume("Space City 1", "./Stage/costumes/Space City 1.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.scrollx = 201.05040064107595;
    this.vars.scrolly = -247;
    this.vars.lifeLeft = 16.5;

    this.watchers.lifeLeft = new Watcher({
      label: "Life Left:",
      style: "normal",
      visible: true,
      value: () => this.vars.lifeLeft,
      x: 245,
      y: 175
    });
  }
}
