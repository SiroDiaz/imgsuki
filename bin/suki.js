#!/usr/bin/env node

var path = require('path');
var entry = path.resolve(process.cwd(), '..', 'lib', 'index.js');
require.resolve(entry);
