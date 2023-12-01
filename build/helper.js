import fs from 'fs';
import fetch from 'node-fetch';
import { config } from 'dotenv';
config();

// Create 'day/day_number' directory
export function createDirectory(folder_path) {
    if (!fs.existsSync(folder_path)){
        fs.mkdirSync(folder_path, { recursive: true });
    }
}

// String array containg existing folders inside 'day' directory
export function getExistingDays() {
    return fs.readdirSync("day/");
}

// Generate array of input script imports
export function generateInputScriptArray(days) {
    const input_script_arr = [];
    const solution_script_arr = [];
    for (let day_number of days) {
        input_script_arr.push(
            `<script src="day/${day_number}/input.js"></script>`
        );
        solution_script_arr.push(
            `<script src="day/${day_number}/p1.js"></script>`
        );
        solution_script_arr.push(
            `<script src="day/${day_number}/p2.js"></script>`
        );
    }
    return {input_script_arr, solution_script_arr};
}

// Create an index.html file that imports inputs and solution files
export function generateIndexFile(input_script_arr, solution_script_arr, day_number) {
    fs.readFile('template/index.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const content = data
            .replace(
                "DAY_NUMBER", 
                day_number
                
            ).replace(
                "<!--INPUT-->", 
                input_script_arr.join("\n")

            ).replace(
                "<!--SOUTION-->",
                solution_script_arr.join("\n")
            );

        fs.writeFile(`index.html`, content, err => {
            if (err) {
                console.error(err);
            }
          });
    });
}

export function generateSolutionFiles(day_number) {
    fs.readFile('template/p.js', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const content = data
            .replace(
                "INPUT_NAME", 
                `input_day_${day_number}`
            )
            .replace(
                "DAY_NUMBER", 
                day_number
            )
            .replace(
                "PART_NUMBER", 
                '1'
            );
        
        fs.writeFile(`day/${day_number}/p1.js`, content, err => {
            if (err) {
                console.error(err);
            }
        });
        fs.writeFile(`day/${day_number}/p2.js`, "", err => {
            if (err) {
                console.error(err);
            }
        });
    });
}

export async function pullInputFile(day_number) {
    const year = process.env.YEAR;
    const url = "https://adventofcode.com";
    const response = await fetch(`${url}/${year}/day/${day_number}/input`, {
        headers: {
            cookie: `session=${process.env.SESSION}`
        }
    });
    const body = await response.text();
    return body;
}

export function generateInputFile(inputContent, day_number) {
    // Regenerate html file to contain
    // import lines for all existing days
    const content = `(() => { input[${day_number}] = \`${inputContent}\`; })()`;
    fs.writeFile(`day/${day_number}/input.js`, content, err => {
        if (err) {
            console.error(err);
        }
    });
}