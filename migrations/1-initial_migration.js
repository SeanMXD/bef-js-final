'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "posts", deps: []
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2020-03-14T19:28:44.305Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "posts",
            {
                PostId: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                  },
                  PostTitle: Sequelize.STRING,
                  PostBody: Sequelize.STRING,
                  UserId: {
                    type: Sequelize.INTEGER,
                    foreignKey: true
                  },
                  Deleted: {
                      type: Sequelize.BOOLEAN,
                      defaultValue: false
                  }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {
                UserId: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true, 
                    allowNull: false
                  },
                  FirstName: Sequelize.STRING,
                  LastName: Sequelize.STRING,
                  Username: {
                    type: Sequelize.STRING,
                    unique: true
                  },
                  Password: Sequelize.STRING,
                  Email: {
                    type: Sequelize.STRING,
                    unique: true,
                    
                  },
                  Admin: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                  },
                  Deleted: {
                      type: Sequelize.BOOLEAN,
                      defaultValue: false
                  }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
