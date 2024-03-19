module.exports = {
  apps: [
    {
      name: "task",
      script: "./src/index.ts",
      interpreter: "node",
      interpreter_args: "-r ts-node/register",
      watch: true,
      env: {
        NODE_ENV: "test",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
