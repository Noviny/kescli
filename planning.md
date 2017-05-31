# KESCLI (Keystone 4 CLI Tool)

## Status note: 1/6/17:

As stands, the project has been reshaped to use babel to copy a directory, allowing babel plugins to work directly on to the files to make modifications. Quick win was allowing a project name to be passed in, but since we run through the entire file, going to dig in to customising all the files.

First approach:
- Add prebuild step for things that need it (babelplugins)
- sort out which deps we're using and strip the others
- If we're getting build-y, can add pre-commits for prettier, also add flow pls, means lib and src/compiled directory
- 1 plugin per file with differences, finds the AST of the right module (program?) and makes changes set by the starter type
- 2 some files are unique to a starter. Instead of including them in the initial parse, do a second run without the .babelrc (for speed) to dump those files in (do them synchronously?)
- Once these are both working for both project, add tests for functions and consider names.

## Major features

- Generate a Keystone MVK file structure ✅✅
- Set up keystone with react, webpack ✅✅
- add tests for kescli
- Use AST to more smartly set up keystone.js file ✅
- Use AST to share code properly between different starters ✅
- Create, update and validate models from command line
- Develop properly interactive CLI actions rather than pass/fail single lines
- Add/remove routes from the router
- Add json config file that can be read to generate same project skeleton
- Generate route-bindings for a model
- add tests to kescli starters
