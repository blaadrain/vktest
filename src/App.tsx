import Filters from './components/Filters';
import Group from './components/Group';
import { GroupInterface } from './types';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGroups,
  selectGroups,
  selectIsLoading,
} from './store/slices/groups-slice';
import { useEffect } from 'react';
import { AppDispatch } from './store/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector(selectGroups);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <>
      <Filters />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-12">
        {isLoading && <span>Загрузка...</span>}
        {!isLoading && groups.length === 0 && <span>Ничего не найдено :(</span>}
        {groups.map((group: GroupInterface) => (
          <Group
            key={group.id}
            {...group}
          />
        ))}
      </div>
    </>
  );
}

export default App;
