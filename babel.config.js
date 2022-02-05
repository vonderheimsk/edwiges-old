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
            alias: {
                "@client": ["./src/lib/client"],
                "@gateway": ["./src/lib/gateway"],
                "@rest": ["./src/lib/rest"],
                "@structures": ["./src/lib/structures"],
                "@interfaces": ["./src/lib/interfaces"]
            } 
        }]
    ],
    ignore: [
        '**/*.spec.ts'
    ]
}