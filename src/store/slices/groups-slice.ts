import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GroupInterface } from '../../types';
import { RootState } from '../store';
import { getGroups } from '../../actions/get-groups';

interface GroupsSliceState {
  groups: GroupInterface[];
  isLoading: boolean;
  privacyFilter: 'none' | string;
  avatarColorFilter: 'none' | string;
  friendsFilter: boolean;
}

const initialState: GroupsSliceState = {
  groups: [],
  isLoading: true,
  privacyFilter: 'none',
  avatarColorFilter: 'none',
  friendsFilter: false,
};

export const fetchGroups = createAsyncThunk('groups/fetchGroups', async () => {
  try {
    const { result, data: groups } = await getGroups();
    if (result === 0 || !groups) return [];
    return groups;
  } catch (error) {
    console.error(error);
  }
});

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups(state, action: PayloadAction<GroupInterface[]>) {
      state.groups = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPrivacyFilter(state, action: PayloadAction<'none' | string>) {
      state.privacyFilter = action.payload;
    },
    setAvatarColorFilter(state, action: PayloadAction<'none' | string>) {
      state.avatarColorFilter = action.payload;
    },
    setFriendsFilter(state, action: PayloadAction<boolean>) {
      state.friendsFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.groups = [];
        state.isLoading = true;
      })
      .addCase(
        fetchGroups.fulfilled,
        (state, action: PayloadAction<GroupInterface[] | undefined>) => {
          state.groups = action.payload ?? [];
          state.isLoading = false;
        }
      )
      .addCase(fetchGroups.rejected, (state) => {
        state.groups = [];
        state.isLoading = false;
      });
  },
});

export const selectGroups = (state: RootState) => {
  const { groups, privacyFilter, avatarColorFilter, friendsFilter } =
    state.groups;

  return groups.filter((group: GroupInterface) => {
    if (privacyFilter !== 'none') {
      if (group.closed && privacyFilter === 'open') return false;
      if (!group.closed && privacyFilter === 'closed') return false;
    }

    if (
      avatarColorFilter !== 'none' &&
      group.avatar_color !== avatarColorFilter
    ) {
      return false;
    }

    if (friendsFilter && !group.friends) {
      return false;
    }

    return true;
  });
};

export const selectIsLoading = (state: RootState) => state.groups.isLoading;

export const {
  setGroups,
  setIsLoading,
  setPrivacyFilter,
  setAvatarColorFilter,
  setFriendsFilter,
} = groupsSlice.actions;

export default groupsSlice.reducer;
