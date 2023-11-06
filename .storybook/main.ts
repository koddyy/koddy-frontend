import type { StorybookConfig } from "@storybook/nextjs";
import * as path from "path";
import type { RuleSetRule } from "webpack";

const config: StorybookConfig = {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: path.resolve(__dirname, "../next.config.js"),
    },
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, ".."),
      };
    }

    if (!config.module || !config.module.rules) return config;

    const imageRule = (config.module.rules as RuleSetRule[]).find(
      (rule) => rule.test instanceof RegExp && rule.test.test(".svg")
    );

    if (imageRule) imageRule.exclude = /.svg$/;

    config.module.rules.push({
      test: /.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
export default config;
