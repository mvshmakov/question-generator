const Probe = require("pmx").probe();

Probe.metric({
    name: "ENV",
    value: () => {
        return process.env.ENV;
    },
});

const COMMON_ENV = {
    NODE_PATH: ".",
    NODE_HEAPDUMP_OPTIONS: "nosignal",
};

module.exports = {
    apps: [
        {
            name: "question-generator",
            instances: 1,
            script: "./dist/server.min.js",
            env_production: {
                ...COMMON_ENV,
                ENV: "production",
            },
        },
        {
            name: "question-generator-dev",
            instances: 1,
            script: "src/bin/starter.ts",
            interpreter: "node_modules/.bin/ts-node",
            watch: ["src", "static"],
            args: `--mode=${process.env.MODE || "development"}`,
            ignore_watch: ["node_modules"],
            merge_logs: true,
            env: {
                ...COMMON_ENV,
                ENV: "development",
            },
        },
    ],
};
