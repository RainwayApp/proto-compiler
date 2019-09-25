#! /usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shell = require("shelljs");
var path = require("path");
var _ = require("lodash");
var process = require("process");
var argv = require('yargs').argv;
var config = require("./config.json");
function splitIntoBlocks(input) {
    var messages = input.match(/message[^{]*{[^}]*}/gs);
    var enums = input.match(/enum[^{]*{[^}]*}/gs);
    return messages.concat(enums);
}
function dedupeBlocks(input) {
    return _.uniq(input);
}
function mergeBlocks(input) {
    return input.join("\n\n");
}
function addHeader(input) {
    var output = input.slice();
    output.unshift('syntax = "proto2";');
    return output;
}
var inputPath = path.resolve(__dirname, config.in);
var outputFile = path.resolve(__dirname, config.outFile);
var extension = config.ext;
if (argv.in && argv.outFile) {
    inputPath = path.resolve(process.cwd(), argv.in);
    outputFile = path.resolve(process.cwd(), argv.outFile);
}
if (argv.ext) {
    extension = argv.ext;
}
/*else {
    inputPath = path.resolve(__dirname, config.in)
    outputFile = path.resolve(__dirname, config.outFile)
}*/
shell.cd(inputPath);
var inputFiles = shell.ls("*" + extension);
var entireInput = shell.cat(inputFiles);
var blocks = splitIntoBlocks(entireInput);
var dedupedBlocks = dedupeBlocks(blocks);
var outputText = shell.ShellString(mergeBlocks(addHeader(dedupedBlocks)));
outputText.to(outputFile);
