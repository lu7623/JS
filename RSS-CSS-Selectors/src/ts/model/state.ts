import { levels } from "./levels";

 type state = {
    currentLevel: levels;
    userLevels: levels[];
}

export const currentState: state = {
    currentLevel: 0,
    userLevels: []
}