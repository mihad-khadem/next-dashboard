interface SkeletonProps {
  height?: number | string;
  width?: number | string;
  style?: React.CSSProperties;
  className?: string;
}

export default function Skeleton({
  height = 20,
  width = "100%",
  style = {},
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`skeleton-loader ${className}`}
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        width: typeof width === "number" ? `${width}px` : width,
        borderRadius: 4,
        background:
          "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
        backgroundSize: "400% 100%",
        animation: "skeleton-shimmer 1.2s ease-in-out infinite",
        ...style,
      }}
    />
  );
}
