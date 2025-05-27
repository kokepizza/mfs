import FeedMobile from './FeedMobile';
import FeedDesktop from './FeedDesktop';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { type Project } from '../data/projects';

type FeedProps = {
  projects: Project[];
};

export default function Feed({ projects }: FeedProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return isDesktop ? (
    <FeedDesktop projects={projects} />
  ) : (
    <FeedMobile projects={projects} />
  );
}