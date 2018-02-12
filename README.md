# imgsuki

[![Build Status](https://travis-ci.org/SiroDiaz/imgsuki.svg?branch=master)](https://travis-ci.org/SiroDiaz/imgsuki)

A command line tool for manipulate images with Node.JS.
Do you like sushi? try suki!

## What is imgsuki?

Imgsuki is a command line Node.JS application for reducing time for small modifications that in
GIMP or PhotoShop would take more time. It uses Sharp.js and Commander libraries and even more for getting
image information as exif data or other details.
More command will be added to simplify the hard task of edit images.

## Commands availables

Options:

    -v, --version  output the version number
    -h, --help     output usage information


  Commands:

    resize [options] <file>            Resize the specified image
    rotate [options] <file> <degrees>  Rotate the image in multiples of 90
    convert [options] <file>           Converts the image to a supported format (.jpg and .png)
    flip [options] <file>              Flips the image in the vertical Y axis
    flop|mirror [options] <file>       Flips the image in the horizontal X axis
    blur [options]                     Applies a blur effect
    info|i [options]                   Command for retrieve image information


## License

_imgsuki_ is licensed under the MIT License. (See LICENSE)