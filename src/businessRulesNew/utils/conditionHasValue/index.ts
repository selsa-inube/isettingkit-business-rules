/* eslint-disable @typescript-eslint/no-explicit-any */
import { hasMeaningfulValue } from "../hasMeaningfulValue";

const conditionHasValue = (c: any): boolean => hasMeaningfulValue(c?.value);

export { conditionHasValue };