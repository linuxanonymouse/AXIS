import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, className, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    ...props,
  };
}

export function IconSun(props: IconProps) {
  const p = base(props);
  return (
    <svg {...p}>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
  );
}

export function IconEarth(props: IconProps) {
  const p = base(props);
  return (
    <svg {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.25" />
      <path
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        d="M3 12h18M12 3c2.5 2.8 3.8 6 3.8 9s-1.3 6.2-3.8 9M12 3c-2.5 2.8-3.8 6-3.8 9s1.3 6.2 3.8 9"
      />
    </svg>
  );
}

export function IconVenus(props: IconProps) {
  const p = base(props);
  return (
    <svg {...p}>
      <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.25" />
      <path stroke="currentColor" strokeWidth="1.25" d="M12 14v7M9 18h6" />
    </svg>
  );
}

export function IconMars(props: IconProps) {
  const p = base(props);
  return (
    <svg {...p}>
      <circle cx="10" cy="14" r="5" stroke="currentColor" strokeWidth="1.25" />
      <path
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        d="M14 10l6-6M16 4h4v4"
      />
    </svg>
  );
}

export function IconJupiter(props: IconProps) {
  const p = base(props);
  return (
    <svg {...p}>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.25" />
      <path
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
        d="M6 10h12M5.5 14h13M6.5 17.5h11"
      />
    </svg>
  );
}

export function IconSaturn(props: IconProps) {
  const p = base(props);
  return (
    <svg {...p}>
      <ellipse
        cx="12"
        cy="14"
        rx="9"
        ry="2.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <circle cx="12" cy="10" r="4.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  const p = base(props);
  return (
    <svg {...p}>
      <path stroke="currentColor" strokeWidth="1.5" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  const p = base(props);
  return (
    <svg {...p}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M6 6l12 12M18 6L6 18"
      />
    </svg>
  );
}

export function IconArrow(props: IconProps) {
  const p = base(props);
  return (
    <svg {...p}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M13 6l6 6-6 6"
      />
    </svg>
  );
}

export function IconAxis(props: IconProps) {
  const p = base(props);
  return (
    <svg {...p}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path stroke="currentColor" strokeWidth="1.25" d="M12 7v10M7 12h10" />
    </svg>
  );
}

const BY_PLANET: Record<string, (p: IconProps) => ReactElement> = {
  Sun: IconSun,
  Earth: IconEarth,
  Venus: IconVenus,
  Mars: IconMars,
  Jupiter: IconJupiter,
  Saturn: IconSaturn,
};

export function PlanetIcon({
  planet,
  stageId,
  ...props
}: IconProps & { planet: string; stageId?: string }) {
  const Icon =
    stageId === "intro" ? IconSun : BY_PLANET[planet] ?? IconEarth;
  return <Icon {...props} />;
}
