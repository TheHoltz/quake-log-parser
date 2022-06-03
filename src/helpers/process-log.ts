import * as fs from "fs";
import * as readline from "readline";
import Parser from "../model/parser";

async function processLog(inputFile: string, outputFile: string) {
    const fileStream = fs.createReadStream(inputFile);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    const logParser = new Parser();

    for await (const line of rl) {
        logParser.parseLine(line);
    }

    const output = logParser.generateReport();

    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));

    console.log(`Report generated at ${outputFile}`);
}

export default processLog;