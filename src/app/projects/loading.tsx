import { Skeleton, SkeletonShimmer } from "@/components/loading/SkeletonShimmer";

const card = "rounded-card border border-white/5 bg-card";

export default function ProjectsLoading() {
  return (
    <SkeletonShimmer className="mx-auto flex w-full max-w-[1512px] flex-col gap-3 px-4 py-4 sm:px-6 sm:py-6 wide:px-[50px] wide:py-[30px]">
      {/* Nav bar */}
      <div data-skeleton-card className="flex items-center justify-between gap-3 rounded-[16px] border border-white/5 bg-card p-3">
        <div className="flex items-center gap-3">
          <Skeleton className="size-[38px] rounded-[10px]" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-32 rounded-full" />
            <Skeleton className="h-2.5 w-24 rounded-full" />
          </div>
        </div>
        <Skeleton className="hidden h-[46px] w-[320px] sm:block" />
        <Skeleton className="hidden h-8 w-40 rounded-full md:block" />
      </div>

      {/* Page header */}
      <div data-skeleton-card className={`${card} flex flex-col gap-4 p-6 sm:p-8`}>
        <Skeleton className="h-8 w-28 rounded-full" />
        <Skeleton className="h-10 w-2/3 max-w-md" />
        <Skeleton className="h-4 w-full max-w-xl rounded-full" />
      </div>

      {/* Filters */}
      <div data-skeleton-card className="flex gap-2 rounded-[16px] border border-white/5 bg-card p-2">
        {["w-16", "w-[120px]", "w-[130px]", "w-[110px]"].map((width) => (
          <Skeleton key={width} className={`h-[38px] shrink-0 rounded-[10px] ${width}`} />
        ))}
      </div>

      {/* Project cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} data-skeleton-card className={`${card} flex flex-col gap-4 p-3`}>
            <Skeleton className="aspect-[16/10] w-full rounded-[14px]" />
            <div className="flex flex-col gap-2.5 px-2 pb-2">
              <Skeleton className="h-3 w-24 rounded-full" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3 w-full rounded-full" />
              <div className="flex gap-1.5 pt-1.5">
                <Skeleton className="h-6 w-14 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SkeletonShimmer>
  );
}
