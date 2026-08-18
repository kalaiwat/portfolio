import './page.css';

export function About() {
  return (
    <section className="page section">
      <h1 className="page__title">about</h1>
      <div className="page__prose">
        <p>
          machine learning is the closest available tool for modeling how cognition
          actually works — every architecture decision doubles as a hypothesis about
          intelligence itself. that throughline runs under everything below: not just
          shipping products, but building toward systems that reason.
        </p>
        <p>
          before Georgia Tech, coursework at Lawrence Technological University (dual
          enrollment, computer science II through operating systems, linear algebra,
          discrete math) compressed most of a CS foundation ahead of freshman year.
          since then: three founded products, two internships, one hackathon placement
          — GetPaid, Derm AI, and SpareLot as founder/CTO; Core OS at 10x and Derm AI
          integration work at Nolla Health as an engineer; 2nd place at ClawComp with
          Synqed.
        </p>
        <p>
          the near-term goal is closing the gap between "consumed an AI API" and
          "trained or evaluated a model" — the specific signal ML research and
          engineering roles screen for. coursework, VIP research, and a model-training
          project are underway toward that.
        </p>
      </div>
    </section>
  );
}
