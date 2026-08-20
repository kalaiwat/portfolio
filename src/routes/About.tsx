import { Link } from 'react-router-dom';
import './page.css';

export function About() {
  return (
    <section className="page section">
      <h1 className="page__title">about</h1>
      <div className="page__prose">
        <p>
          <strong>2022:</strong> started experimenting with Unity and Unreal Engine,
          building small games from scratch, a first exposure to how software
          actually gets structured.
        </p>
        <p>
          <strong>2023:</strong> the interest flipped, i pulled apart other
          games instead of building new ones. reverse engineering meant learning to read compiled code, trace memory, and reconstruct
          logic with no source in front of me, a different kind of systems literacy
          than tutorials teach.
        </p>
        <p>
          <strong>2024:</strong> brought web technologies, specifically React, and
          with it <Link className="page__link" to="/projects/sparelot">SpareLot</Link>, the first full end-to-end project: a fullstack
          marketplace for renting out spare storage space, with Firebase handling
          auth, data, and transactions. the same year, my dual enrollment at Lawrence
          Technological University started, compressing a CS foundation ahead of
          schedule rather than waiting for high school graduation to begin learning.
        </p>
        <p>
          <strong>2025:</strong> moved into mobile with <Link className="page__link" to="/projects/derm-ai">Derm AI</Link>, my first shipped
          mobile app, built with Expo and React Native, later
          integrated into Nolla Health's <Link className="page__link" to="/experience/nolla">Nolla Skin</Link> app under a cross-company
          partnership.
        </p>
        <p>
          <strong>2026:</strong> combined engine internals, systems-level reading,
          product-building, and platform experience into <Link className="page__link" to="/experience/getpaid">GetPaid</Link>, the first
          genuinely high-impact project: $100K+ in revenue, 20K monthly active
          users, and a #150 U.S. App Store Finance ranking in under 60 days,
          including attribution and growth infrastructure that none of the earlier
          projects required.
        </p>
        <p>
          <strong>Today:</strong> the progression, from engines to reverse engineering to web to mobile to
          a real product with real distribution, is what's now pointed at Georgia
          Tech and the Intelligence and Modeling &amp; Simulation threads. each step
          meant understanding a system one layer deeper than the last, and ML/LLM
          research is the next layer i'm getting down.
        </p>
      </div>
    </section>
  );
}