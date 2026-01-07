interface IRenderCtx<TData> {
  data: TData;
  isMobile: boolean;
  isTablet: boolean;
}

export type { IRenderCtx };