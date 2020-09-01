module.exports = {
    'ecmaFeatures': {
        'modules': true,
    },
    'env': {
        'es6': true,
        'browser': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
    ],
    'parserOptions': {
        'sourceType': 'module',
        'ecmaVersion': 2020,
    },
    'rules': {
        'array-bracket-spacing': [ 'error', 'always' ],
        'brace-style': [ 'error', 'allman', { 'allowSingleLine': true } ],
        'comma-dangle': [ 'error', 'always-multiline' ],
        'comma-spacing': [ 'error', { 'before': false, 'after': true } ],
        'eqeqeq': 'warn',
        'indent': [ 'error', 4, {
            'SwitchCase': 1,
        } ],
        'init-declarations': 'off',
        'linebreak-style': [ 'error', 'windows' ],
        'no-async-promise-executor': 'off',
        'no-cond-assign': [ 'error', 'always' ],
        'no-console': 'off',
        'no-empty': 'off',
        'no-inline-comments': 'off',
        'no-unused-vars': [ 'off', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false } ],
        'object-curly-spacing': [ 'error', 'always' ],
        'one-var': 'off',
        'quotes': [ 'error', 'single' ],
        'semi': [ 'error', 'never' ],
        'space-infix-ops': [ 'error', { 'int32Hint': false } ],
        'strict': 'off',
    },
    overrides: [
        {
            'files': [ '**/*.ts', '**/*.tsx' ],
            'globals': {
                'Atomics': 'readonly',
                'SharedArrayBuffer': 'readonly',
            },
            'parser': '@typescript-eslint/parser',
            'parserOptions': {
                'ecmaFeatures': { 'jsx': true },
                'ecmaVersion': 2018,
                'sourceType': 'module',
                'project': './tsconfig.json',
            },
            'plugins': [
                '@typescript-eslint',
            ],
            'extends': [
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
            ],
            rules: {
                '@typescript-eslint/ban-ts-comment': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-namespace': 'off',
                '@typescript-eslint/no-this-alias': 'off',
                '@typescript-eslint/no-var-requires': 'off',
                'no-prototype-builtins': 'off',
            },
        },
    ],
}
