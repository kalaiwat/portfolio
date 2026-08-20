import { resolveStack } from '../content/techs';
import './TechGrid.css';

export function StackGrid({ stack }: { stack: string[] }) {
  const { resolved } = resolveStack(stack);
  if (resolved.length === 0) return null;

  return (
    <div className="tech">
      <ul className="tech__grid">
        {resolved.map((tech) => (
          <li className="tech__tile" key={tech.id}>
            <img className="tech__icon" src={tech.src} alt="" loading="lazy" />
            <span className="tech__label caption">{tech.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
