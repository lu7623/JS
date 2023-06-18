import { params } from "../types/types";

export const levelParams: params[] = [
] 

export const Level1: params = {level: 1, answer: 'rice', html: '', table: ['&lt;table&gt;',' &nbsp;&lt;rice /&gt;',  '&nbsp;&lt;rice /&gt;', '&lt;/table&gt;']};
export const Level2: params = {level: 2, answer: '#spicy', html: '', table: ['&lt;table&gt;',' &nbsp;&lt;ramen /&gt;',  '&nbsp;&lt;ramen id="spicy" /&gt;', '&lt;/table&gt;']};
export const Level3: params = {level: 3, answer: 'plate sushi', html: '', table: ['&lt;table&gt;', '&nbsp;&lt;plate&gt;', '&nbsp;&nbsp;&lt;sushi /&gt;', '&nbsp;&lt;/plate&gt;', '&nbsp;&lt;sushi /&gt;', '&lt;/table&gt;']};
export const Level4: params = {level: 4, answer: '.salmon', html: '', table: ['&lt;table&gt;', '&nbsp;&lt;plate&gt;', '&nbsp;&nbsp;&lt;roll /&gt;', '&nbsp;&nbsp;&lt;roll class="salmon"/&gt;', '&nbsp;&lt;/plate&gt;', '&nbsp;&lt;sushi /&gt;', '&nbsp;&lt;sushi class="salmon" /&gt;', '&lt;/table&gt;']};
export const Level5: params = {level: 5, answer: 'wasabi, ginger' ||  'ginger, wasabi' , html: '', table: ['&lt;table&gt;', '&nbsp;&lt;wasabi /&gt;', '&nbsp;&lt;roll /&gt;', '&nbsp;&lt;roll /&gt;', '&nbsp;&lt;ginger /&gt;', '&nbsp;&lt;sushi /&gt;', '&nbsp;&lt;sushi /&gt;', '&lt;/table&gt;']};
export const Level6: params = {level: 6, answer: '*', html: '', table: ['&lt;table&gt;', '&nbsp;&lt;ginger /&gt;', '&nbsp;&lt;ramen /&gt;', '&nbsp;&lt;sushi /&gt;', '&nbsp;&lt;sushi /&gt;', '&nbsp;&lt;sause /&gt;', '&lt;/table&gt;']};
export const Level7: params = {level: 7, answer: 'rice + sushi', html: '', table: ['&lt;table&gt;', '&nbsp;&lt;sushi /&gt;', '&nbsp;&lt;rice /&gt;', '&nbsp;&lt;sushi /&gt;', '&nbsp;&lt;rice /&gt;', '&nbsp;&lt;sushi /&gt;', '&lt;/table&gt;']};
export const Level8: params = {level: 8, answer: 'ramen ~ sushi', html: '', table: ['&lt;table&gt;', '&nbsp;&lt;sushi class="octopus"/&gt;', '&nbsp;&lt;ramen /&gt;', '&nbsp;&lt;sushi class="octopus" /&gt;', '&nbsp;&lt;sushi /&gt;', '&nbsp;&lt;sause /&gt;', '&lt;/table&gt;']};
export const Level9: params = {level: 9, answer: 'plate > roll', html: '', table: ['&lt;table&gt;', '&nbsp;&lt;wasabi /&gt;', '&nbsp;&lt;plate&gt;', '&nbsp;&nbsp;&lt;roll /&gt;', '&nbsp;&nbsp;&lt;roll /&gt;', '&nbsp;&nbsp;&lt;roll /&gt;',  '&nbsp;&lt;/plate&gt;',  '&nbsp;&lt;sushi /&gt;',  '&nbsp;&lt;roll /&gt;', '&lt;/table&gt;']};
export const Level10: params = {level: 10, answer: 'table:first-child', html: '', table: ['&lt;table&gt;',' &nbsp;&lt;plate&gt;', '&nbsp; &nbsp;&lt;roll class="salmon" /&gt;', '&nbsp; &nbsp;&lt;roll class="salmon" /&gt;', '&nbsp; &nbsp;&lt;roll class="salmon" /&gt;', '&nbsp;&lt;/plate &gt;', '&nbsp;&lt;sushi/&gt;', '&nbsp;&lt;roll class="salmon" /&gt;', '&lt;/table&gt;']};
export const Level11: params = {level: 11, answer: 'roll:nth-of-type(even)', html: '', table: ['&lt;table&gt;', '&nbsp;&lt;roll /&gt;', '&nbsp;&lt;roll /&gt;', '&nbsp;&lt;roll /&gt;', '&nbsp;&lt;roll /&gt;', '&nbsp;&lt;roll /&gt;', '&nbsp;&lt;roll /&gt;', '&lt;/table&gt;']};
export const Level12: params = {level: 12, answer: 'plate:empty', html: '', table: ['&lt;table&gt;',' &nbsp;&lt;plate&gt;', '&nbsp; &nbsp;&lt;roll class="salmon" /&gt;', '&nbsp; &nbsp;&lt;roll class="salmon" /&gt;', '&nbsp;&lt;/plate &gt;', '&nbsp;&lt;sause/&gt;', ' &nbsp;&lt;plate&gt;', ' &nbsp;&lt;/plate&gt;', '&lt;/table&gt;']};
