import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import processLog from "./helpers/process-log";

const argv = yargs(hideBin(process.argv))
    .usage("Usage: $0 -i [input_file] -o [output_file]")
    .example('generate -i ./input/game.log -o ./output/out.json', 'generate a report file for the game.log file')
    .alias('i', 'input')
    .alias('o', 'output')
    .demandOption(["i", "o"]).argv as any;

processLog(argv.i, argv.o);
