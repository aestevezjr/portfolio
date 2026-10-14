export default function RootPage() {
  return (
    <p style={{ padding: "2rem", fontFamily: "system-ui" }}>
      {/* Plain <a>: "/en/" lives under a different root layout, so it needs a full page load. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/en/">Continue to the site</a>
    </p>
  );
}
