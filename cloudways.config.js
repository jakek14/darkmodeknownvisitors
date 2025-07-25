module.exports = {
  apps: [
    {
      name: 'knownvisitors',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        DEPLOYMENT_TYPE: 'cloudways',
        PORT: process.env.PORT || 3000
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
}; 