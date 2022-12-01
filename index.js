import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Player from "./Player/Player.js";
import Levels from "./Levels/Levels.js";
import Coins from "./Coins/Coins.js";

const stage = new Stage({ costumeNumber: 3 });

const sprites = {
  Player: new Player({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 6,
    size: 95,
    visible: true,
    layerOrder: 2
  }),
  Levels: new Levels({
    x: 198.0650686532704,
    y: -252,
    direction: 90,
    costumeNumber: 4,
    size: 400,
    visible: true,
    layerOrder: 3
  }),
  Coins: new Coins({
    x: -47,
    y: 89,
    direction: 90,
    costumeNumber: 4,
    size: 100,
    visible: false,
    layerOrder: 1
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
