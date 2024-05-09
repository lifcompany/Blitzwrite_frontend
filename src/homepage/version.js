import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";

function Version() {
  const categories = [
    { id: 1, title: "GPT-4", slug: "gpt-4" },
    { id: 2, title: "GPT-4-TURBO", slug: "gpt-4-turbo" },
    { id: 3, title: "GPT-3.5", slug: "gpt-3.5" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("gpt-3.5-0125");
  function handleSelectedCategory(event) {
    setSelectedCategory(event.target.value);
  }
  return (
    <FormControl className="flex w-[300px] sm:w-136" variant="outlined">
      <InputLabel id="category-select-label">Version</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        label="Category"
        value={selectedCategory}
        onChange={handleSelectedCategory}
      >
        <MenuItem value="gpt-3.5-0125">GPT-3.5-0125</MenuItem>
        {categories.map((category) => (
          <MenuItem value={category.slug} key={category.id}>
            {category.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Version;
