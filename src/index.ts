import * as fs from "fs";
import * as readline from "readline";
import Parser from "./model/parser";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

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

// Debug only
// processLog("./input/game.log", "./output/teste.json")

const argv = yargs(hideBin(process.argv))
    .usage("Usage: $0 -i [input_file] -o [output_file]")
    .example('generate -i ./input/game.log -o ./output/out.json', 'generate a report file for the game.log file')
    .alias('i', 'input')
    .alias('o', 'output')
    .demandOption(["i", "o"]).argv as any;

processLog(argv.i, argv.o);
