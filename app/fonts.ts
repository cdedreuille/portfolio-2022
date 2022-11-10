import localFont from "@next/font/local";

export const redaction = localFont({
  src: [
    { path: "./fonts/Redaction-Regular.woff2", weight: "100" },
    { path: "./fonts/Redaction_10-Regular.woff2", weight: "200" },
    { path: "./fonts/Redaction_20-Regular.woff2", weight: "300" },
    { path: "./fonts/Redaction_35-Regular.woff2", weight: "400" },
    { path: "./fonts/Redaction_50-Regular.woff2", weight: "500" },
    { path: "./fonts/Redaction_70-Regular.woff2", weight: "600" },
    { path: "./fonts/Redaction_100-Regular.woff2", weight: "700" },
  ],
  weight: "100 200 300 400 500 600 700",
});
