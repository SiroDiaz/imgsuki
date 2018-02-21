'use strict';

var chalk = require('chalk');
var program = require('commander');
var validator = require('./validation');
var command = require('./command_promises');

program
    .version('0.1.3', '-v, --version')
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
    .command('convert')
    .description('Converts the image to a supported format (.jpg, .png, .webp, .tiff, .raw)')
    .option('-i, --input <file>', 'The file you want get information. '+ chalk.red('(required)'), validator.fileExists)
    .option('-f, --format <format>', 'Converts the image to another format', /(jpg|png|webp|tiff|raw)/i)
    .option('-o, --output <output>', 'Output directory with the filename (optional)', validator.dirExists)
    .action(command.convert);

program
    .command('flip')
    .description('Flips the image in the vertical Y axis')
    .option('-i, --input <file>', 'The file you want get information. '+ chalk.red('(required)'), validator.fileExists)
    .option('-o, --output <output>', 'Output directory with the filename (optional)', validator.dirExists)
    .action(command.flip);

program
    .command('flop')
    .alias('mirror')
    .description('Flips the image in the horizontal X axis')
    .option('-i, --input <file>', 'The file you want get information. '+ chalk.red('(required)'), validator.fileExists)
    .option('-o, --output <output>', 'Output directory with the filename (optional)', validator.dirExists)
    .action(command.flop);

program
    .command('blur')
    .description('Applies a blur effect')
    .option('-i, --input <file>', 'The file you want get information. '+ chalk.red('(required)'), validator.fileExists)
    .option('-s, --sigma <sigma>', 'The blur level. From 0.3 to 1000', validator.isValidSigma)
    .option('-o, --output <output>', 'Output directory with the filename (optional)', validator.dirExists)
    .action(command.blur);

program
    .command('info')
    .alias('i')
    .description('Command for retrieve image information')
    .option('-i, --input <file>', 'The file you want get information. '+ chalk.red('(required)'), validator.fileExists)
    .option('-a, --all', 'Prints all information about the image')
    .option('-c, --camera', 'Prints only camera information')
    .action(command.info);

module.exports = program;
