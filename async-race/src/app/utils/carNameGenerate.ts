const firstName = ['AUDI', 'MERSEDES', 'TOYOTA', 'CHEVROLET', 'BMW', 'LEXUS', 'FORD', 'VOLVO', 'FERRARI', 'PORSCHE'];
const modelName = ['Model 1', 'Model 2', 'Model 3', 'Model 4', 'Model 5', 'Model 6', 'Model 7', 'Model 8', 'Model 9', 'Model 10',];

export default function generateCarName() {
    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 10);
    return `${firstName[n1]} ${modelName[n2]}`;
}