import { FixedSizeList as List } from "react-window";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Row component
const Row = ({ index, style, data }) => {
  const { users, selectedMembers, toggleMember } = data;
  const user = users[index];
  const isSelected = selectedMembers.has(user?._id);

  return (
    <div
      className="flex items-center justify-between gap-4 px-2 border-b last:border-none hover:bg-gray-100 transition rounded-lg"
      onClick={() => toggleMember(user._id, user)}
      style={style}
    >
      <div className="flex items-center gap-4">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
          alt={user.name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
        <p className="text-base sm:text-lg font-semibold text-gray-800">
          {user.name}
        </p>
      </div>
      <input
        type="checkbox"
        checked={isSelected}
        readOnly
        className="w-3 h-3 appearance-none rounded-full border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200"
      />
    </div>
  );
};

const Creategroupchat = ({
  text,
  users,
  searchresults,
  isexpanded,
  sessionid,
}) => {
  const [selectedMembers, setSelectedMembers] = useState(new Set());
  const [selectedusers, setSelectedusers] = useState([]);
  const [groupname, setgroupname] = useState("");
  const router = useRouter();
  const data = isexpanded ? searchresults : users;

  const toggleMember = (userId, user) => {

    const newSet = new Set(selectedMembers);
    newSet.has(userId) ? newSet.delete(userId) : newSet.add(userId);
    setSelectedMembers(newSet);
    //console.log(user)

    let newarr=[...selectedusers]

    const index = newarr.findIndex(u => u._id === userId);

  
  if (index !== -1) {
    newarr.splice(index, 1); 
  } else {
   
    newarr.push(user);
  }

  setSelectedusers(newarr);
  
   setSelectedusers(newarr)

   console.log(newarr)
    
   
  };

  const rowData = {
    users: data,
    selectedMembers,
    toggleMember,
  };

  const creategroup = async () => {
    const item = {
      name: groupname,
      members: Array.from(selectedMembers),
      admin: sessionid,
    };
    const res = await axios.post("https://api-chat.treepr.in/creategroup", item);
    setSelectedMembers(new Set());
    setgroupname("");
    router.push(`/mychats/groupui/${res?.data._id}`);
  };

  return (
    <div className="flex flex-col h-full p-2 overflow-hidden">
      {/* Input + Button Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 w-full max-w-xl mx-auto">
        <input
          type="text"
          value={groupname}
          placeholder="Group name"
          className="w-full  px-4 py-2 bg-white text-gray-800 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
          onChange={(e) => setgroupname(e.target.value)}
        />
        <button
          onClick={creategroup}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition duration-200"
        >
          Create
        </button>
      </div>

      {/* Selected Users */}
      <div  className="overflow-x-auto overflow-y-hidden   max-w-64 lg:max-w-full   flex gap-3 pt-4 pb-4 hide-scrollbar">
        {selectedusers.map((user, i) => (
          <div
            key={i}
            className="shrink-0 w-14 h-14 rounded-full overflow-hidden"
            title={user.name}
          >
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* User List */}
      <div className="flex min-h-fit w-full max-w-xl mx-auto ">
    <List
      height={window.innerWidth < 640 ? 340 : 330}
      className="scrollbar-hidden"
      itemData={rowData}
      itemCount={data.length}
      itemSize={70}
      width="100%"
    >
      {Row}
    </List>
  </div>
    </div>
  );
};

export default Creategroupchat;
