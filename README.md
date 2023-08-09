## 目錄

- [資料夾結構說明](#資料夾結構說明)
- [專案創建與初始化](#專案創建與初始化)
- [Reference](#reference)

## 資料夾結構說明

```
EXPRESS_SEQUELIZE_SQLITE_TYPESCRIPT
│  package-lock.json
│  package.json
│  server.ts                // Express Web server setting
│  tsconfig.json            // typescript config
│
├─.vscode                    // 排版設定
│      extensions.json
│      settings.json
│
├─owgw-data                    // DB 位置
│  └─persist
│          devices.db
│
└─src
    ├─config
    │      db.config.ts        // DB連線資訊
    │
    ├─contorllers
    ├─json_validate            // JSON validate schema
    │      configuration.validate.ts
    │      eap-statistic.validate.ts
    │      statistics.validate.ts
    │
    ├─models                    // table schma 設定
    │  │  index.ts
    │  │
    │  └─owgw
    │          devices.model.ts
    │          statistics.model.ts
    │
    └─routes                        // Restful API CRUD設定
            cbtTopology.route.ts
            devices.route.ts
            index.ts
```

## 專案創建與初始化

- 建立`package.json`
  `npm init -y`
- 安裝套件
  1. Express — Node.js framework
     `npm install express`
  2. Sequelize — object-relational mapper for Sqlite
     `npm install --save sequelize`
  3. Typescript — Adds additional syntax to JavaScript . Catch errors early in your editor.
     `npm install typescript --save-dev`
  4. ts-node-dev - It restarts target node process when any of required files changes but shares Typescript compilation process between restarts.
     `npm install ts-node-dev @types/node --save-dev`
  5. Sqlite3 — a Sqlite client for Node.js
     `npm install sqlite3`
  6. Bcrypt — For password hashing
     `npm install bcrypt`
  7. Dotenv =>For access to your environment variable(optional)
     `npm install dotenv`

## Reference

- [Build Type Safe API with Sequelize TypeScript and Express.js](https://dev.to/franciscomendes10866/how-to-use-sequelize-orm-with-typescript-3no)
- [Sequelize with TypeScript](https://sequelize.org/docs/v6/other-topics/typescript/)
- [Node.js Authentication with PostgreSQL, Sequelize, and Express.js](https://medium.com/@rachealkuranchie/node-js-authentication-with-postgresql-sequelize-and-express-js-20ae773da4c9)
- [Sequelize-Data Types](https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types)
- [Simple Login and Registration with ExpressJS, Sequelize, bcrypt and JWT](https://www.weblearningblog.com/nodejs/simple-login-and-registration-with-expressjs-sequelize-bcrypt-and-jwt/)
- [cookbook(GitHub)](https://github.com/ibywaks/cookbook/tree/master)
- [使用 Swagger 自動生成 API 文件](https://israynotarray.com/nodejs/20201229/1974873838/)
- [swagger-autogen](https://swagger-autogen.github.io/docs/openapi-3/)
