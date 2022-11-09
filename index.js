#!/usr/bin/env node

/**
 * generator-single-components
 * generator single application components
 *
 * @author @bendan <null>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const generateJsComponent = require('./utils/generateJsComponent')
const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	flags.name && flags.folder && (await generateJsComponent(flags.name, flags.folder))
	// debug && log(flags);
})();
