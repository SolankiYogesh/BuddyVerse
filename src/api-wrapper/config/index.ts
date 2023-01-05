import defaultConfig from './index.default';

import devConfig from './index.dev';
// import stagingConfig from './index.staging';
// import productionConfig from './index.production';

const config = {...defaultConfig, ...devConfig};

export {config};
