# Proto2 Preprocessor
A simple utility that takes multiple proto2 protocol buffer schema files, concatenates them and removes duplicate blocks. Meant for internal use at Rainway so that protoc won't complain about duplicates and missing imports since the protobuf.net schema generator does not produce valid schemas according to `protoc`'s demands.

## Usage
1. `yarn`
2. `yarn global add ts-node typescript`
3. `./index.ts --in ./directory/containing/schemas --outFile ./concatenated-output-file.proto --ext .proto`

Or you can just build it with `npm run build` and `./index.js`. Either way.

It will accept either an absolute path, or a relative path, relative to the current working directory.

By default, if either `in` or `outFile` are not provided, it will use the values from `config.json`. Same with `ext`, which defaults to `.proto`

This package isn't on npm yet, but you should be able to install it globally for command line usage by running:

1. `yarn pack`
2. `yarn global add proto-compiler-1.0.0.tgz`

Just make sure you've built it first. Then you can run the script with `proto-concat` anywhere.

I THINK that should work but I haven't tried it. The other projects that use this script just reference it directly.
