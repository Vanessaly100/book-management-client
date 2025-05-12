// components/MembershipSelect.jsx
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function MembershipSelect({ value, onChange, placeholder = "Select Membership" }) {
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
          value="basic"
          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
        >
          Basic
        </SelectItem>
        <SelectItem 
          value="standard"
          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
        >
          Standard
        </SelectItem>
        <SelectItem 
          value="premium"
          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
        >
          Premium
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
