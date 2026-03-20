import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAllCategories } from "@/lib/actions/product.actions";

const Search = async () => {
  const categories = await getAllCategories();

  return (
    <form action="/search" method="GET">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Select name="category">
          <SelectTrigger
            className="w-[120px]"
            aria-label="Select button for category filter"
          >
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="All" value="all">
              All
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.category} value={cat.category}>
                {cat.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center">
          <Input
            name="q"
            type="text"
            placeholder="Search..."
            className="md:w-[200px] rounded-e-none border-r-0"
          />
          <Button
            aria-label="Search and filter"
            className="cursor-pointer border-l-0 rounded-s-none"
          >
            <SearchIcon />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Search;
