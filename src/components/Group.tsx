import { useState } from 'react';
import { GroupInterface } from '../types';

const Group = ({
  name,
  closed,
  avatar_color,
  members_count,
  friends,
}: GroupInterface) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className="p-4 rounded-lg border shadow-sm">
      <div className="flex items-center gap-x-4 mb-2">
        {avatar_color && (
          <div
            style={{ background: avatar_color }}
            className="h-8 w-8 rounded-full"
          ></div>
        )}
        <span>{name}</span>
      </div>
      {closed && <p>{closed ? 'Закрытая' : 'Открытая'} группа</p>}
      {members_count > 0 && <p>Подписчиков: {members_count}</p>}
      {friends && (
        <div
          className="cursor-pointer text-blue-500 hover:text-blue-700 transition"
          onClick={() => setIsHidden(!isHidden)}
        >
          {friends.length === 1
            ? 'Подписан 1 друг'
            : `Подписано ${friends.length} друзей`}
        </div>
      )}
      {isHidden &&
        friends?.map((friend) => (
          <div key={friend.first_name + friend.last_name}>
            {friend.first_name} {friend.last_name}
          </div>
        ))}
    </div>
  );
};

export default Group;
