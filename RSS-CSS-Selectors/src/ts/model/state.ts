import { levels } from "./levels";

 type state = {
    currentLevel: levels;
    userLevels: levels[];
    helpUsed: levels[]
}

export const currentState: state = {
    currentLevel: 0,
    userLevels: [],
    helpUsed: []
}

export type levelable = (lvl: levels) => void;
export type check = (input: string) => boolean;