module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-typescript',
    ],
    plugins: [
        ['module-resolver', {
            root: ['./src/'],
            alias: {
                "@client": "./src/lib/client",
                "@gateway": "./src/lib/gateway",
                "@rest": "./src/lib/rest",
                "@structures": "./src/lib/structures",
                "@interfaces": "./src/lib/interfaces",
                "@utils": "./src/lib/utils",
                "@managers": "./src/lib/managers",
            } 
        }]
    ],
    ignore: [
        '**/*.spec.ts'
    ]
}