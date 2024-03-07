import groups from '../../groups.json';
import { GetGroupsResponseInterface } from '../types';

export const getGroups = async () => {
  try {
    return new Promise<GetGroupsResponseInterface>((resolve) => {
      setTimeout(() => {
        const items: GetGroupsResponseInterface = {
          result: 1,
          data: groups,
        };
        resolve(items);
      }, 1000);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
