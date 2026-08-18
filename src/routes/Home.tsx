import './Home.css';

export function Home() {
  return (
    <section className="home section">
      {/* the hero is the thesis — it should read in under five seconds */}
      <h1 className="display home__name">Kareem Alaiwat</h1>
      <p className="home__framing">
        computer science @ Georgia Tech — building toward machine learning and LLM
        research, with a secondary interest in quantitative systems.
      </p>
      <p className="home__current">
        currently: co-founder/CTO at GetPaid. previously: Core OS at 10x, Derm AI at
        Nolla Health.
      </p>
    </section>
  );
}
