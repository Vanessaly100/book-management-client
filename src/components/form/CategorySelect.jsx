import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function CategorySelect({ value, onChange, placeholder = "Select Category" }) {
  return (
    <Select
      value={value || ""}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-full p-2 border-none rounded-lg bg-gray-300">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white shadow-lg rounded-lg p-2">
        <SelectItem 
          value="Science Fiction"
          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
        >
          Science Fiction
        </SelectItem>
        <SelectItem 
          value="Mystery"
          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
        >
         Mystery
        </SelectItem>
        <SelectItem 
          value="Fantasy"
          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
        >
          Fantasy
        </SelectItem>
        <SelectItem 
          value="Non-Fiction"
          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
        >
          Non-Fiction
        </SelectItem>
        <SelectItem 
          value="Biography"
          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
        >
          Biography
        </SelectItem>
        <SelectItem 
          value="Thriller"
          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
        >
          Thriller
        </SelectItem>
        <SelectItem 
          value="Romance"
          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
        >
          Romance
        </SelectItem>
        <SelectItem 
          value="History"
          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
        >
          History
        </SelectItem>
        <SelectItem 
          value="Self-Help"
          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
        >
          Self-Help
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
