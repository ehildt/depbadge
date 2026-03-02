type Theme = "dark" | "white";
type Position = "left" | "right" | "center" | "justify";
type OutputFormat = "json" | "markdown";
type SupportedManifest = "package.json" | "pyproject.toml" | "Cargo.toml";

export type BadgeStyle = {
  color?: string;
  labelColor?: string;
  isError?: boolean;
  namedLogo?: string;
  logoSvg?: string;
  logoColor?: string;
  logoWidth?: number;
  style?: string;
  cacheSeconds?: number;
  link?: string;
};

export type Layout = {
  theme?: Theme;
  header?: string;
  showHeader?: boolean;
  position?: Position;
};

export type DependencyItem = BadgeStyle & {
  name: string;
  message: string;
};

export type Dependencies = {
  layout?: Layout;
  badgeStyle?: BadgeStyle;
  items: DependencyItem[];
};

export type GitHubStatusBadge = DependencyItem & {
  name: "github";
  metric: "stars" | "license" | "release";
  user: string;
  repo: string;
  branch?: string | null;
};

export type DockerHubStatusBadge = DependencyItem & {
  name: "docker";
  metric: "pulls" | "stars" | "v";
  user: string;
  image: string;
  tag?: string | null;
};

export type CodecovStatusBadge = DependencyItem & {
  name: "codecov";
  user: string;
  repo: string;
  branch?: string;
  flag?: string | null;
  token?: string;
};

export type StatusBadgeItem = GitHubStatusBadge | DockerHubStatusBadge | CodecovStatusBadge;

export type StatusBadges = {
  layout?: Layout;
  badgeStyle?: BadgeStyle;
  items: StatusBadgeItem[];
};

export type DepbadgeRC = {
  integrity?: string;
  target?: string;
  manifest: SupportedManifest;
  output?: OutputFormat[];

  dependenciesLayout?: Layout;
  devDependenciesLayout?: Layout;
  peerDependenciesLayout?: Layout;
  statusBadgesLayout?: Layout;

  dependenciesStyle?: BadgeStyle;
  devDependenciesStyle?: BadgeStyle;
  peerDependenciesStyle?: BadgeStyle;
  statusBadgesStyle?: BadgeStyle;

  dependencies: Dependencies;
  devDependencies?: Dependencies;
  peerDependencies?: Dependencies;
  statusBadges?: StatusBadges;
};
