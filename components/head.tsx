import Head from "next/head";

const title = "Charles de Dreuille";
const description =
  "Product + Design + Engineering == 🖤 Connect design and engineering for humans of this world. Ex Meta, Christian Louboutin, Deliveroo, Soho House and a handful of entrepreneurs.";
const image = "https://charlesdedreuille.com/preview.jpg";

export const MainHead = () => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Tell the browser to never restore the scroll position on load */}
      <script
        dangerouslySetInnerHTML={{
          __html: `history.scrollRestoration = "manual"`,
        }}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#5bbad5"
      />

      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#f5f7fb" />
      <meta name="title" property="og:title" content={title}></meta>
      <meta
        name="description"
        property="og:description"
        content={description}
      ></meta>
      <meta name="image" property="og:image" content={image}></meta>
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@cdedreuille" />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};
