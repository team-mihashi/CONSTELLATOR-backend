# API template

Uses Typescript and Express

## How to use

### Setup

```
$ git clone <THIS REPOSITORY>
$ cd <THIS REPOSITORY NAME>
$ cp .env.example .env
$ yarn
```

### Create migration file

```
$ yarn migration:generate <FILE NAME>
```

### Run migration

(Before you run this, you should rewrite ormconfig.json and create database which you wanna use.)

```
$ yarn migration:run
```

### Development

```
$ yarn dev
```

Then server is up on port according to your .env file.

### How to test

```
$ curl http://localhost:PORT/users
```