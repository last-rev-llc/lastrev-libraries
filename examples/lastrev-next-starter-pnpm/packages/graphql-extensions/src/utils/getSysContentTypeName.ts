import { capitalizeFirst } from './capitalizeFirst';

export const getSysContentTypeName = (obj: any) => capitalizeFirst(obj?.sys?.contentType?.sys?.id);
