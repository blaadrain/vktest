import { useDispatch } from 'react-redux';
import {
  setPrivacyFilter,
  setAvatarColorFilter,
  setFriendsFilter,
} from '../store/slices/groups-slice';
import { ChangeEvent } from 'react';

const Filters = () => {
  const dispatch = useDispatch();

  const handlePrivacyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPrivacyFilter(event.target.value));
  };

  const handleAvatarColorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setAvatarColorFilter(event.target.value));
  };

  const handleFriendsChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFriendsFilter(event.target.checked));
  };

  return (
    <div className="flex justify-center items-center gap-x-12 mt-8 mx-12 p-4 border rounded-lg">
      <div className="flex flex-col gap-y-2">
        <label htmlFor="privacy">Приватность</label>
        <select
          id="privacy"
          onChange={handlePrivacyChange}
        >
          <option value="none">Все</option>
          <option value="closed">Закрытая</option>
          <option value="open">Открытая</option>
        </select>
      </div>
      <div className="h-12 border" />
      <div className="flex flex-col gap-y-2">
        <label htmlFor="avatarColor">Цвет аватарки</label>
        <select
          id="avatarColor"
          onChange={handleAvatarColorChange}
        >
          <option value="none">Любой</option>
          <option value="red">Красный</option>
          <option value="green">Зеленый</option>
          <option value="blue">Синий</option>
          <option value="yellow">Желтый</option>
          <option value="orange">Оранжевый</option>
          <option value="purple">Фиолетовый</option>
          <option value="white">Белый</option>
        </select>
      </div>
      <div className="h-12 border" />
      <label>
        <input
          type="checkbox"
          onChange={handleFriendsChange}
        />
        <span className="pl-2">С друзьями</span>
      </label>
    </div>
  );
};

export default Filters;
