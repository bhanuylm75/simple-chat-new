import { chatHrefConstructor } from "../lib/utils";
import Link from "next/link";

const generateDummyUsers = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    _id: `user_${i}`,
    name: `User ${i + 1}`,
  }));
};

const Sidebarcontent = ({ sessionId, text }) => {
  const users = generateDummyUsers(50); // 50 users for testing scrolling

  return (
    <div className="h-96 overflow-y-auto scrollbar-hidden
  border-r border-gray-300 pt-4 ">
      {/* Header */}
      <p className="text-lg font-semibold text-gray-700 mb-4">{text}</p>

      {/* Scrollable Users List */}
      <div className="space-y-1">
        {users.map((user) => (
          <Link key={user._id} href={`/mychats/${chatHrefConstructor(sessionId, user._id)}`}>
            <div className="flex items-center shadow-sm gap-4 p-3 border-b last:border-none lg:hover:bg-gray-100 transition rounded-lg">
             
              <div>
                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebarcontent;
