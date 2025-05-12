import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function BooleanSelect({ value, onChange, placeholder = "Select Option" }) {
  return (
    <Select
      value={value === true ? "true" : value === false ? "false" : ""}
      onValueChange={(val) => onChange(val === "true")}
    >
      <SelectTrigger className="w-full p-2 border-none rounded-lg bg-gray-300">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white shadow-lg rounded-lg p-2">
        <SelectItem 
          value="true" 
          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
        >
          Yes
        </SelectItem>
        <SelectItem 
          value="false" 
          className="transition-all duration-200 hover:bg-tealGreenish hover:text-white focus:bg-tealGreenish focus:text-Gold"
        >
          No
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
