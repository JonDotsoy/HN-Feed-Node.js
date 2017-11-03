# Practice Express + Mongo DB

What is this? I love the hacker news and love NodeJS,
If you like it too, should download it. This is a news panel with auto refresh written in Node JS with Babel 7.  See more down to learn how to run it. Thanks 😁.

— Jonathan

----

![Preview](https://i.imgur.com/JOUDMWT.png)

### Dependencies

The requirement of software:

- [Node](https://nodejs.org/en/) greater than 8.9.0
- [MongoDB](https://www.mongodb.com) (Prefer greater than 3.4.10)

> **Optional:**
>
> - [docker](https://www.docker.com)
> - [docker-compose](https://docs.docker.com/compose)

## How to install

> ⚠ Go to the project folder.

Use the next command line

```bash
$ npm install
```

### Do you use [Docker](https://www.docker.com)?

Use [docker-compose](https://docs.docker.com/compose) to up mongo service

```bash
# Up the services required
$ docker-compose up -d
# Use without "-d" to view the logs
$ docker-compose up
```

### Up the MongoDB

Please read the next article to run MongoDB.

- [Article](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)


## How to configure this app

Use the `.env` file to define the configurations.

> All configurations are used with the environment variables.

| Environment Variable | Default       | Description                      |
| -------------------- | ------------- | -------------------------------- |
| DB_HOST              | `'localhost'` | Host to connect with MongoDB     |
| DB_POST              | `'27017'`     | Port to connect with MongoDB     |
| DB_NAME              | `'practice'`  | Name of the collection to use    |
| DB_PASSWORD          | _void_        | Password to connect with MongoDB |
| DB_USERNAME          | _void_        | Username to connect with MongoDB |
| HOST                 | `'::'`        | Host of the server               |
| PORT                 | `'3000'`      | Port of the server               |

Also, you can use the `set` to define the configuration in your environment. For example.

```bash
# set the port to open server
$ set PORT=9000
```

## How to run APP

To run the APP use then next command line.

```bash
$ npm start
```

This command loads the `src/index.js` file. This file is transpiled with Babel@7 (See `.babelrc.js` to read the spec).


## App structure

- `src/index.js`: This file initializes the connection with mongo and loads the modules.
- `src/modules`: Save the modules (A module is a code snippet to work in a process, Ej. render the home.).
- `src/schemas`: Save the schemas (A schema define the model to use in the db.)
- `src/schemas/Article.js`: Define the schema to use the Article Model.
- `src/resources`
- `src/resources/views`: Save the views written on Pug files.
- `src/resources/views/articles.pug`: Render an article collection.
- `src/resources/views/layout.pug`: Define the layout base to any renders on here has the head tag and body tag.
