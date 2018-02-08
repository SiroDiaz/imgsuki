'use strict';

var program = require('commander');
var image = require('./image');

program
    .version('0.1.0', '-v, --version')
    .command('resize <file>')
    .description('Resize the specified image')
    .option('-w, --width <width>', 'Image width')
    .option('-h, --height <height>', 'Image height')
    .option('-o, --output <output>', 'Output directory and/or filename (optional)')
    .action(image.resize);

program
    .command('rotate <file> <degrees>')
    .description('Rotate the image in multiples of 90. Negatives degrees allowed.')
    .option('-o, --output <output>', 'Output directory and/or filename (optional)')
    .action(image.rotate);

program
    .command('convert <file>')
    .description('Converts the image to a supported format (.jpg and .png)')
    .option('-f, --format <format>', 'Converts the image to another format', /(jpg|png|webp)/i)
    .option('-o, --output [output]', 'The file output (optional)')
    .action(image.convert);

program
    .command('flip <file>')
    .description('Flips the image in the vertical Y axis')
    .option('-o, --output <output>', 'Output directory with the filename (optional)')
    .action(image.flip);

program
    .command('flop <file>')
    .description('Flips the image in the horizontal X axis')
    .option('-o, --output <output>', 'Output directory with the filename (optional)')
    .action(image.flop);

program
    .command('blur <file> <sigma>')
    .action(image.blur);

module.exports = program;
