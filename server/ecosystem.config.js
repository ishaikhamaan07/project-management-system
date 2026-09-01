module.exports = {
    apps: [
        {
            name: "project-management-system",
            script: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "development",
            },
        },
    ],
};