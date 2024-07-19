import React from 'react';

const KeyWordShow = ({mainkeyword}) => {
    return (
        <div className="text-[#3C4257]">
            <p className="text-[14px] mb-3 font-medium">メインキーワード</p>
            <div className="w-full sm:w-[350px] h-[50px] p-[12px] text-base border-2 rounded-lg">
                {mainkeyword}
            </div>
        </div>
    )
}

export default KeyWordShow;



// <Select
//             labelId="category-select-label"
//             id="category-select"
//             label="Category"
//             value={selectedModelId}
//             onChange={handleSelectedModel}
//           >
//             {/* Add this line */}
//             {models.map((model) => (
//               <MenuItem value={model._id} key={model._id}>
//                 {model.display_name}
//               </MenuItem>
//             ))}
//           </Select>



// <form className="max-w-sm mx-auto">
// <select id="countries" className="bg-gray-50 text-gray-900 text-sm block w-[50px] cursor-pointer">
//     <option selected>h1</option>
//     <option value="US">h2</option>
//     <option value="CA">h3</option>
//     <option value="FR">h4</option>
//     <option value="DE">h5</option>
//     <option value="DE">h6</option>
// </select>
// </form>