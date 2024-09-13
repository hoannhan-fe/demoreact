import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { SearchIcon } from 'lucide-react';

const Search = () => {
  const [search, setSearch] = useState<string>('');

  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleSearch = () => {
    if (search.trim() !== '') {
      router.push(`/search?search=${search}`);
    }
  };

  return (
    <div className="h-11 w-[500px] px-4 py-2.5 my-auto relative flex gap-4 bg-background-secondary items-center hover:ring-2 rounded-full duration-200 shadow-shadow">
      <SearchIcon className="cursor-pointer text-icon" size={24} />
      <input
        type="text"
        className="pr-10 ring-/0 w-full focus:outline-none text-sm bg-transparent"
        placeholder="Search something..."
        onChange={handleInputChange}
        onSubmit={handleSearch}
        value={search}
      />
    </div>
  );
};

export default Search;
