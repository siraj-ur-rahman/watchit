#!/usr/bin/env node
const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');

program.version('0.0.1')
.argument('[filename]', 'Name of a file to execute')
.action(async({filename})=> {

    const name = filename || 'index.js';
    try {
        await fs.promises.access(name);
    } catch(err) {
        throw new Error(`Couldn't not find the file ${name}`);
    }
});

program.parse(process.argv);

const start = debounce(()=>{
    console.log('Starting User program')
}, 100);


chokidar.watch('.')
.on('add', start)
.on('change', () => console.log('file changed'))
.on('unlink', () => console.log('File Unlinked'));