/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable tsdoc/syntax */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Alzebra",
  tagline: "The All-In-One Herd of Linear Algebra Functions",
  url: "https://alzebra.yashtotale.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  // GitHub pages deployment config
  organizationName: "YashTotale",
  projectName: "alzebra",
  trailingSlash: false,
  // Internationalization
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      "docusaurus-plugin-typedoc",
      {
        name: "Alzebra",
        excludePrivate: true,
        entryPoints: ["../src/alzebra.ts"],
        watch: process.env.TYPEDOC_WATCH,
        tsconfig: "../tsconfig.json",
        out: "",
        allReflectionsHaveOwnDocument: true,
        sidebar: {
          readmeLabel: "Overview",
        },
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/icon.png",
      navbar: {
        title: "Alzebra",
        logo: {
          alt: "Alzebra Logo",
          src: "img/icon.svg",
        },
        items: [
          {
            to: "docs/",
            activeBasePath: "docs",
            label: "Docs",
            position: "left",
          },
        ],
      },
      footer: {
        style: "light",
        logo: {
          alt: "Alzebra Logo",
          src: "img/icon-64.svg",
        },
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Overview",
                to: "/docs/",
              },
              {
                label: "Exports",
                to: "/docs/modules",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Issues",
                to: "https://github.com/YashTotale/alzebra/issues",
              },
              {
                label: "Pull Requests",
                to: "https://github.com/YashTotale/alzebra/pulls",
              },
            ],
          },
          {
            title: "Project",
            items: [
              {
                label: "NPM",
                to: "https://www.npmjs.com/package/alzebra",
              },
              {
                label: "GitHub",
                to: "https://github.com/YashTotale/alzebra",
              },
            ],
          },
          {
            title: "Author",
            items: [
              {
                label: "Website",
                to: "https://www.yashtotale.dev/",
              },
              {
                label: "GitHub",
                to: "https://github.com/YashTotale",
              },
              {
                label: "LinkedIn",
                to: "https://www.linkedin.com/in/yash-totale/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Yash Totale`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
