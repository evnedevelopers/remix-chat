import { guidances } from "~/utils/mocks/guidances";
import { IGuidance } from "~/utils/typedefs";

export const findAllGuidance = (): IGuidance[] => {
  return guidances
    .filter((guidance) => !guidance.parentId)
    .map((guidance) => {
      const sub_guidances = guidances.filter((sub) => sub.parentId === guidance.id);

      return {
        ...guidance,
        sub_guidances,
      }
    });
}