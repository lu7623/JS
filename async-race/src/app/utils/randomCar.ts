import { CarParams } from "../model/API";
import generateCarName from "./carNameGenerate";
import generateColor from "./colorGenerate";

export default function makeRandomCar():CarParams {
    return {name: generateCarName(), color: generateColor()}
}