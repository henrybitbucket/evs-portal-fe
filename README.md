# cms-internal-TOT

CMS internal's using nextjs, reactjs, redux, es6, ts, express, tslint, jest..

<!-- prettier-ignore -->
| Branch    | Tests | Code Coverage | Comments                  |
| --------- | ----- | ------------- | ------------------------- |
| `develop` | [![pipeline status](https://git.toponseek.com/TOT/Intern-System/TOT.Internal.UI/badges/develop/pipeline.svg)](https://git.toponseek.com/TOT/Intern-System/TOT.Internal.UI/commits/develop) | [![coverage report](https://git.toponseek.com/TOT/Intern-System/TOT.Internal.UI/badges/develop/coverage.svg?job=unit)](https://git.toponseek.com/TOT/Intern-System/TOT.Internal.UI/commits/develop) | Work in progress |
| `master`  | [![pipeline status](https://git.toponseek.com/TOT/Intern-System/TOT.Internal.UI/badges/master/pipeline.svg)](https://git.toponseek.com/TOT/Intern-System/TOT.Internal.UI/commits/master) | [![coverage report](https://git.toponseek.com/TOT/Intern-System/TOT.Internal.UI/badges/master/coverage.svg?job=unit)](https://git.toponseek.com/TOT/Intern-System/TOT.Internal.UI/commits/master) | Latest Production Release |

## Links

- [App Prototype](https://www.figma.com/files/recent) in Fima
- [Issue project board](https://git.toponseek.com/TOT/Intern-System/TOT.Internal.UI/boards)

## Development

To set up your local development environment refer to the official doc:
https://github.com/segmentio/create-next-app

This app has been ejected from CNA

## Folder Structure

Our source is created by CNA, after createing it should look something like:

```
.
├── README.md
├── apis
├── components
│   ├── Common
│   └── Component1
    └── Component2
├── redux
├── server
│   ├── index.js
├── next.config.js
├── node_modules
│   ├── [...]
├── package.json
├── pages
│   └── index.js
├── static
│   └── fonts
    └── icons
    └── images
    └── locales
    └── styles
└── yarn.lock
```

Routing in Next.js is based on the file system, so `./pages/index.js` maps to the `/` route and
`./pages/about.js` would map to `/about`.

Now we are using the custom server that using Express, so if you want to modify routers just focus on `./server/routes/prettyUrlRouter.ts`

The `./static` directory maps to `/static` in the `next` server, so you can put all your
other static resources like images or compiled CSS in there.

### Environment Variables

See `.env` for development defaults.

| Variable               | Notes                                                              |
| -----------------      | ------------------------------------------------------------------ |
| `NODE_ENV`             | Node environment variables. Default: development                   |
| `HOST`                 | Host of app. Default: 0.0.0.0                                      |
| `PORT`                 | Port of app. Default: 3000                                         |
| `API_TURN_ON`          | Flag to turn on api service. Default: true                         |
| `API_SERVICE_HOST`     | Host of api service. Default: 7000                                 |
| `WWW_API_SERVICE_HOST` | Url api service. Need to change this if you have other url for api |
| `RECAPCHA_SITE_KEY`    | The key of recapche                                                |

### Prerequisites

- [NodeJS](htps://nodejs.org), version >= 10.0.0 < 11. (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)

- `npm install -g yarn`


### Installing dependencies

```sh
yarn or yarn install
```

### Running Tests

```sh
yarn test
```

### Running Linter

```sh
yarn lint
```

### Running Linter fix

```sh
yarn lint-fix
```

### Running Bunddle Analyze

```sh
yarn analyze
```

### Run the app

Make sure you have .env file(copy content from .env.example file)

```sh
yarn develop
```

**TROUBLESHOOTING NOTE**: If you are having trouble running the app for the first time please delete the `node_module` and run yarn again.

### Build the app

```sh
yarn build
```

**NOTE**: If you want running the app after build app successful:

With production env: 

```sh
yarn start
```

With testing env: 

```sh
yarn start-test
```


### Redux dev tools

_Add details of how to access the app from within Chrome_

To view the state in the app install [the Redux dev tools Chrome plugin](https://chrome.google.com/webstore/detail/remotedev/faicmgpfiaijcedapokpbdejaodbelph/related).

## Deployment

_to be completed_

## Question and Issues
[Nextjs] (https://github.com/zeit/next.js/)