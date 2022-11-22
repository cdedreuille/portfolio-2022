export default async function Head() {
  const title = "Charles de Dreuille";
  const description =
    "Product + Design + Engineering == 🖤 Connect design and engineering for humans of this world. For the past 12 years I had the chance to work for companies like Meta, Christian Louboutin, Deliveroo, Soho House and a handful of entrepreneurs delivering delightful experiences for their users.";
  const image = "https://charlesdedreuille.com/preview.jpg";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      <meta name="theme-color" content="#000000" />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@cdedreuille" />
      <meta name="twitter:image" content={image} />
    </>
  );
}
