import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);

// /** @type {import('next').NextConfig} */
// import createNextIntlPlugin from "next-intl/plugin";

// const nextConfig = {
//   webpack(config) {
//     const fileLoaderRule = config.module.rules.find((rule) =>
//       rule.test?.test?.(".svg")
//     );

//     config.module.rules.push(
//       {
//         ...fileLoaderRule,
//         test: /\.svg$/i,
//         resourceQuery: { not: /svgr/ },
//       },
//       {
//         test: /\.svg$/i,
//         issuer: { not: /\.(css|scss|sass)$/ },
//         resourceQuery: /svgr/,
//         use: ["@svgr/webpack"],
//       }
//     );

//     fileLoaderRule.exclude = /\.svg$/i;

//     return config;
//   },
// };

// const withNextIntl = createNextIntlPlugin();
// export default withNextIntl(nextConfig);
