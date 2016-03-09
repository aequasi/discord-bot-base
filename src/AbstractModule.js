const _ = require('lodash');

class AbstractModule {
    get name() {
        return this.constructor.name.replace('Module', '').toLowerCase();
    }

    get commandsDir() {
        throw new Error("Must extend get commandsDir");
    }

    constructor() {
        if (this.constructor === AbstractModule) {
            throw new Error("Can't instantiate abstract class!");
        }
    }

    getCommands() {
        if (!this.commands) {
            this.commands = _.map(require('require-all')(this.commandsDir), value => {
                value.module = this.name;

                return value;
            });

        }

        return this.commands;
    }

    isDefaultEnabled() {
        return true;
    }
}

module.exports = AbstractModule;