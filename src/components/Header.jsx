import useCurrentPath from './useCurrentPath';

export default function Header() {
  const currentPath = useCurrentPath();

  return (
    <header>
      <div className="view-style">
        <a href="/" className={currentPath === '' ? 'current-page' : ''}>Feed</a>
        <a href="/work-list" className={currentPath === '/work-list' ? 'current-page' : ''}>List</a>
      </div>
      <div className="nav">
        <a href="/about" className={currentPath === '/about' ? 'current-page' : ''}>About</a>
        <a href="/contact" className={currentPath === '/contact' ? 'current-page' : ''}>Contact</a>
      </div>
    </header>
  );
}