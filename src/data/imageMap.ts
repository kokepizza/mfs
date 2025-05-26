const imageMap = import.meta.glob('../assets/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const cleanPath = (path: string) => path.replace('/assets', '../assets');

export function getImage(path: string): string | undefined {
  return imageMap[cleanPath(path)];
}