# Keystone 4 Command Line Interface

A quick and easy CLI To get you up and running with a new [keystone](https://www.npmjs.com/package/keystone) project. Currently it generates a version of the [minimum viable keystone](https://github.com/Noviny/minimum-viable-keystone) package, pulling in only the files you need.

```
npm install -g kescli
```

From there run

```
kescli NEW_PROJECT_NAME
```

and it will make you a working version of a base keystone 4 app in a new directory of the specified project name.

This is intended to compliment the [keystone generator](https://www.npmjs.com/package/generator-keystone), as a more lightweight package when you want to manually do the configuration.

## Project Starter Options

Kescli currently offers two project starters to use as a base. There is the aforementioned `mvk`, which is the default choice. Alternately, you can start a react project by using

```
kescli NEW_PROJECT_NAME react-spa
```

The react Single Page App is designed to set you up to iterate quickly on a core keystone app, serving the react files out of keystone's server. By default it includes webpack and babel, as well as commands to build your project. It includes nodemon to handle automatic restarting of the server when files outside of the `dist` directory change.

NOTE: The starter is not a production-ready setup for distributing a keystone app, and should not be taken as such.
