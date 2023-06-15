// export const meta = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

import { Link } from "@remix-run/react";
import homeStyles from '../styles/home.css'



export default function Index() {
  return (
    <main id="content">
      <h1>A better way to keeping track of your notes</h1>
      <p>Try our early beta and never lose track of your notes</p>
      <p id="cta">
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  );
}

export function links() {
  return [{rel: 'stylesheet', href: homeStyles}]
}