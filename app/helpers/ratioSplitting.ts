export const ratioSplitting = (separator?: string, ratio?: string | null) => {
  return ratio ? ratio.split(separator ?? ':').map(Number) : [16, 9];
};
