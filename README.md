# Games in React

### Dependecies
You will need Go (I'm using 1.12.6) and Node/npm (v10.15.3 / 6.4.1)

### Dev
```shell
# One terminal pane
$ cd server
$ go build && ./server

# Another terminal pane
$ npm i && npm start
```

Then visit `localhost:3333`. Webpack will automatically rebuild on save, but you will need to refresh the page.

### Prod
```
$ npm i && npm run build
$ cd server
$ go build && ./server
```

Then visit `localhost:3333`

### Added TravisCI
Automatically builds when pushed to Github.