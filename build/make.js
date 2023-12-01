import path from 'path';
import {
    createDirectory,
    getExistingDays,
    generateInputScriptArray,
    generateIndexFile,
    generateSolutionFiles,
    pullInputFile,
    generateInputFile
} from './helper.js';

const day_number = process.argv[2];

createDirectory(
    path.join(
        'day',
        day_number
    )
);

const days = getExistingDays();

const {input_script_arr, solution_script_arr} = generateInputScriptArray(days);

generateIndexFile(input_script_arr, solution_script_arr, day_number);

generateSolutionFiles(day_number);

const inputContent = await pullInputFile(day_number);

generateInputFile(inputContent, day_number);