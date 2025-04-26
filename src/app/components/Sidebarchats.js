import { FixedSizeList as List } from "react-window";
import Link from "next/link";
import { chatHrefConstructor } from "../lib/utils";

// Generate dummy users
const generateDummyUsers = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    _id: `user_${i}`,
    name: `User ${i + 1}`,
  }));
};

const users = generateDummyUsers(1000); // Example with 1000 users

// Each row in the list (a single user card)
const Row = ({ index, style, data }) => {
  const { users, sessionId } = data; // Extract users and sessionId
  const user = users[index];

  return (
    <Link href={`/mychats/${chatHrefConstructor(sessionId, user._id)}`} key={user._id}>
      <div
        className="flex items-center shadow-sm gap-4 pl-3 border-b last:border-none lg:hover:bg-gray-100 transition rounded-lg"
        style={style}
      >
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold text-gray-800">{user.name}</p>
        </div>
      </div>
    </Link>
  );
};

const Sidebarchats = ({ text, data, sessionId }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden pt-4">
      

      {/* Virtualized List */}
      <List
        height={460}
        className="scrollbar-hidden lg:h-0"
        itemData={{ users: data, sessionId }} // Pass sessionId with users
        itemCount={data.length}
        itemSize={70}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default Sidebarchats;
