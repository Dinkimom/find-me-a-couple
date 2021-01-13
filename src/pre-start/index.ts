/**
 * Pre-start is where we want to place things that must run BEFORE the express server is started.
 * This is useful for environment variables, command-line arguments, and cron-jobs.
 */

import path from 'path';
import dotenv from 'dotenv';
import commandLineArgs, { CommandLineOptions } from 'command-line-args';

(() => {
  // Setup command line options
  const options: CommandLineOptions = commandLineArgs([
    {
      name: 'env',
      alias: 'e',
      defaultValue: 'development',
      type: String,
    },
  ]);

  // Set the env file
  if (options.env !== 'production') {
    const result2 = dotenv.config({
      path: path.join(__dirname, `env/${options.env as string}.env`),
    });

    if (result2.error) {
      throw result2.error;
    }
  }
})();
