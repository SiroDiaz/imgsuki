# imgsuki

[![Build Status](https://travis-ci.org/SiroDiaz/imgsuki.svg?branch=master&style=flat-square)](https://travis-ci.org/SiroDiaz/imgsuki)
[![dependencies Status](https://david-dm.org/SiroDiaz/imgsuki/status.svg?style=flat-square)](https://david-dm.org/SiroDiaz/imgsuki)
[![GitHub license](https://img.shields.io/github/license/SiroDiaz/imgsuki.svg?style=flat-square)](https://github.com/SiroDiaz/imgsuki/blob/master/LICENSE)

A command line tool for manipulate images with Node.JS.

## What is imgsuki?

Imgsuki is a command line Node.JS application for reducing time for small modifications that in
GIMP or PhotoShop would take more time. It uses Sharp.js and Commander libraries and even more for getting
image information as exif data or other details.
More command will be added to simplify the hard task of edit images.

## Install and usage

Just
```sh
npm install -g imgsuki
```
and run the command line script using
```sh
> suki --help
```

You can get command description running the command and help
```sh
> suki info --help
```

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