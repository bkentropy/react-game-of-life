Much credit goes to https://github.com/jedborovik/go-react-starter for a good starting template.

# Go React Starter

### Notes to self
Use Go and React without missing out on hot module reloading while in development.
Went through a react tutorial to build tic tac toe, now convert to game of life.

### Dev
```shell
# One terminal pane
$ cd server
$ go build && ./server

# Another terminal pane
$ npm i && npm start
```

Then visit `localhost:3334`.

### Prod
```
$ npm i && npm run build
$ cd server
$ go build && ./server
```

Then visit `localhost:3333`
