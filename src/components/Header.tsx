import useCurrentPath from './useCurrentPath';

export default function Header() {
  const currentPath = useCurrentPath();

  return (
    <header className="fixed px-[1.2rem] pt-[1.2rem] w-full flex justify-between z-[100] uppercase text-xs">
      <div className="flex flex-col gap-2 pointer-events-auto">
        <a
          href="/"
          className={`
            ${currentPath === '/' ? 'underline' : ''}
            hover:underline
          `}
        >
          Feed
        </a>
        <a
          href="/work-list"
          className={`
            ${currentPath === '/work-list' ? 'underline' : ''}
            hover:underline
          `}
        >
          List
        </a>
      </div>

      <div className="flex flex-col gap-2 text-right pointer-events-auto">
        <a
          href="/about"
          className={`
            ${currentPath === '/about' ? 'underline' : ''}
            hover:underline
          `}
        >
          About
        </a>
        <a
          href="/contact"
          className={`
            ${currentPath === '/contact' ? 'underline' : ''}
            hover:underline
          `}
        >
          Contact
        </a>
      </div>
    </header>
  );
}