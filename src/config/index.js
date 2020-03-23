// Configurations import
import common from './common';
import local from './local';
import production from './production';

// Configurations by enviroment
const config = {
  local: {
    ...common,
    ...local
  },
  production: {
    ...common,
    ...production
  }
};

// Development => Local
let env = 'local';

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  env = process.env.NODE_ENV;
}

// Enviroments validations
export const isLocal = () => env === 'local';
export const isProduction = () => env === 'production';

// Configuration
export default config[env];
