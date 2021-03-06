module.exports = {
    root: true,
    parser: 'typescript-eslint-parser',
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
    },
    extends: '@centerforopenscience/eslint-config/ember',
    plugins: [
        'typescript',
    ],
    env: {
        browser: true,
        es6: true,
    },
    rules: {
        'arrow-parens': ['error', 'as-needed'],
        'class-methods-use-this': 'off',
        'max-len': ['error', { code: 120 }],
        strict: 'off',
        'ember/named-functions-in-promises': 'off',
        'function-paren-newline': ['error', 'consistent'],
        'prefer-rest-params': 'error',
        'generator-star-spacing': ['error', 'before'],
    },
    overrides: [
        {
            files: ['**/config/environment.d.ts'],
            rules: {
                indent: 'off',
                'indent-legacy': 'error',
            },
        },
        {
            files: ['**/*.ts'],
            rules: {
                // Better enforced by TS
                'no-undef': 'off',
                'no-unused-vars': 'off',
                'ember/no-attrs-snapshot': 'off',
            },
        },
        {
            files: ['**/*.d.ts'],
            rules: {
                'no-restricted-globals': 'off',
            },
        },
        {
            files: ['app/locales/*/translations.ts'],
            rules: {
                'max-len': 'off',
            },
        },
    ],
};
