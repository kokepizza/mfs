import useCurrentPath from './useCurrentPath';
import './Header.css';

export default function Header() {
  const currentPath = useCurrentPath();

  return (
    <header className="header">
      <div className="view-style">
        <a
          href="/"
          className={`
            ${currentPath === '/' ? 'current-page' : ''}
            hover:current-page
          `}
        >
          Feed
        </a>
        <a
          href="/work-list"
          className={`
            ${currentPath === '/work-list' ? 'current-page' : ''}
            hover:current-page
          `}
        >
          List
        </a>
      </div>

      <div className="nav">
        <a
          href="/about"
          className={`
            ${currentPath === '/about' ? 'current-page' : ''}
            hover:current-page
          `}
        >
          About
        </a>
        <a
          href="/contact"
          className={`
            ${currentPath === '/contact' ? 'current-page' : ''}
            hover:current-page
          `}
        >
          Contact
        </a>
      </div>
    </header>
  );
}