# [Alzebra Website](https://alzebra.yashtotale.dev/)

[![Website Status](https://img.shields.io/website?url=https%3A%2F%2Falzebra.yashtotale.dev%2F&style=flat-square&logo=github)](https://alzebra.yashtotale.dev/)

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm install
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

**WARNING: DON'T PERFORM LOCALLY IF DOCS HAVE BEEN CHANGED! GH ACTION DEPLOYS AUTOMATICALLY ON NEW RELEASES!**

1. Create a `.env` file in the website directory which looks like this:

   ```text
   GIT_USER=<Your GitHub username>
   GIT_PASS=<Your GitHub personal access token>
   USE_SSH=false
   ```

2. Then, run the deploy script:

   ```shell
   npm run deploy
   ```

This command is a convenient way to build the website and push to the `gh-pages` branch.
