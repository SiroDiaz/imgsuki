'use strict';

var program = require('commander');
var image = require('./image');

program
    .version('0.1.0', '-v, --version')
    .command('resize <file>')
    .description('Resize the specified image')
    .option('-w, --width <width>')
    .option('-h, --height <height>')
    .option('-o, --output <output>')
    .action(image.resize);

program
    .command('rotate <file> <degrees>')
    .description('Rotate the image in multiples of 90. Negatives degrees allowed.')
    .option('-o, --output <output>')
    .action(image.rotate);

program
    .command('convert <file> <format>')
    .description('Converts the image to a supported format (.jpg and .png)')
    .action(image.convert)
    .command('flip <file>')
    .action(image.flip)
    .command('flop <file>')
    .action(image.flop)
    .command('blur <file> <sigma>')
    .action(image.blur);

module.exports = program;
