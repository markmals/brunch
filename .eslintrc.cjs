/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "@remix-run/eslint-config",
        "@remix-run/eslint-config/node",
        "plugin:react/recommended",
        "plugin:tailwindcss/recommended",
    ],
    overrides: [
        {
            files: ["*"],
            rules: {
                // I want to be able to use CSS when I need to
                "tailwindcss/no-custom-classname": "off",
                // prettier-plugin-tailwindcss will take care of this for me
                "tailwindcss/classnames-order": "off",
                "react/jsx-sort-props": "warn",
                "react/react-in-jsx-scope": "off",
            },
        },
    ],
}
