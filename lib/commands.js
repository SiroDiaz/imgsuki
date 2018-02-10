'use strict';

var chalk = require('chalk');
var program = require('commander');
var command = require('./command_promises');

program
    .version('0.1.2', '-v, --version')
    .command('resize <file>')
    .description('Resize the specified image')
    .option('-w, --width <width>', 'Image width '+ chalk.red('(required)'), parseInt)
    .option('-h, --height <height>', 'Image height', parseInt)
    .option('-o, --output <output>', 'Output directory and/or filename (optional)')
    .option('-y, --yes', 'Confirm rewrite the same file. '+ chalk.red('required if want to rewrite the file'))
    .action(command.resize);

program
    .command('rotate <file> <degrees>')
    .description('Rotate the image in multiples of 90')
    .option('-o, --output <output>', 'Output directory and/or filename (optional)')
    .action(command.rotate);

program
    .command('convert <file>')
    .description('Converts the image to a supported format (.jpg and .png)')
    .option('-f, --format <format>', 'Converts the image to another format', /(jpg|png|webp)/i)
    .option('-o, --output [output]', 'The file output (optional)')
    .action(command.convert);

program
    .command('flip <file>')
    .description('Flips the image in the vertical Y axis')
    .option('-o, --output <output>', 'Output directory with the filename (optional)')
    .action(command.flip);

program
    .command('flop <file>')
    .alias('mirror')
    .description('Flips the image in the horizontal X axis')
    .option('-o, --output <output>', 'Output directory with the filename (optional)')
    .action(command.flop);

program
    .command('blur <file>')
    .description('Applies a blur effect')
    .option('-s, --sigma <sigma>', 'The blur level. From 0.3 to 1000', parseFloat)
    .option('-o, --output <output>', 'Output directory with the filename (optional)')
    .action(command.blur);


module.exports = program;
