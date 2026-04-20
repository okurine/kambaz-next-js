import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Ella Xu - CS4550.33211.202630</h1>
      <p><Link href="/account/signin">Kambaz</Link></p>
      <p><a href="https://github.com/okurine/kambaz-next-js/tree/project" target="_blank">Frontend</a></p>
      <p><a href="https://github.com/okurine/kambaz-node-server-app" target="_blank">Backend</a></p>
    </div>
  );
}