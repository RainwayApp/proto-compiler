# Proto2 Preprocessor
A simple utility that takes multiple proto2 protocol buffer schema files, concatenates them and removes duplicate blocks. Meant for internal use at Rainway so that protoc won't complain about duplicates and missing imports since the protobuf.net schema generator does not produce valid schemas according to `protoc`'s demands.

## Usage
1. `yarn [global] add https://github.com/RainwayApp/proto-compiler`
2. (At the command line if installed globally or in an npm script entry otherwise) `proto-compiler --in ./directory/containing/schemas --outFile ./concatenated-output-file.proto --ext .proto`

Or if you're just using it from the package itself...

1. `yarn`
2. `yarn global add ts-node typescript`
3. `./index.ts --in ./directory/containing/schemas --outFile ./concatenated-output-file.proto --ext .proto`

Or you can just build it with `npm run build` and `./index.js`. Either way.

It will accept either an absolute path, or a relative path, relative to the current working directory.

By default, if either `in` or `outFile` are not provided, it will use the values from `config.json`. Same with `ext`, which defaults to `.proto`