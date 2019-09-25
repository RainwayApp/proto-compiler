#! /usr/bin/env ts-node

import shell = require("shelljs")
import path = require("path")
import _ = require("lodash")
import fs = require("fs")
import process = require("process")
const argv = require('yargs').argv
const config = require("./config.json")

function splitIntoBlocks(input: string) {
    const messages = input.match(/message[^{]*{[^}]*}/gs)
    const enums = input.match(/enum[^{]*{[^}]*}/gs)
    return messages.concat(enums)
}

function dedupeBlocks(input: string[]) {
    return _.uniq(input)
}

function mergeBlocks(input: string[]) {
    return input.join("\n\n")
}

function addHeader(input: string[]) {
    const output = input.slice()
    output.unshift('syntax = "proto2";')
    return output
}


let inputPath = path.resolve(__dirname, config.in)
let outputFile = path.resolve(__dirname, config.outFile)
let extension = config.ext

if (argv.in && argv.outFile) {
    inputPath = path.resolve(process.cwd(), argv.in)
    outputFile = path.resolve(process.cwd(), argv.outFile)
}
if (argv.ext) {
    extension = argv.ext
}
/*else {
    inputPath = path.resolve(__dirname, config.in)
    outputFile = path.resolve(__dirname, config.outFile)
}*/

shell.cd(inputPath)
const inputFiles = shell.ls(`*${extension}`)
const entireInput = shell.cat(inputFiles)
const blocks = splitIntoBlocks(entireInput)
const dedupedBlocks = dedupeBlocks(blocks)
const outputText = shell.ShellString(
    mergeBlocks(
        addHeader(dedupedBlocks)
    )
)
outputText.to(outputFile)