import FilterColor from "./FilterColor";
import FilterSize from "./FilterSize";
import FilterStylies from "./FilterStylies";
import FilterPrice from "./FilterPrice";
import { useFilterLocalContext } from "@/context/FilterLocalContext";

export default function FilterSidebar({ closePopup }) {
  const { applyFilters } = useFilterLocalContext();

  const handleApply = () => {
    applyFilters();
    if (closePopup) closePopup();
  };
  return (
    <div className="max-w-[330px] w-full flex  flex-col h-fit border border-black/10 px-6 pt-5 pb-10 rounded-3xl">
      <FilterStylies
        styles={["T-shirts", "Shorts", "Hoodie", "Jeans"]}
        title="Filters"
        icon="GiSettingsKnobs"
        openIntail={true}
      />
      <span className="inline-block w-full h-px bg-black/10 my-6" />
      <FilterPrice />
      <span className="inline-block w-full h-px bg-black/10 my-6" />
      <FilterColor />
      <span className="inline-block w-full h-px bg-black/10 my-6" />
      <FilterSize />
      <span className="inline-block w-full h-px bg-black/10 my-6" />
      {/* <FilterStylies
        styles={["Casual", "Formal", "Party", "Gym"]}
        title="Style"
        icon="FaAngleRight"
        openIntail={false}
      /> */}
      <button
        onClick={handleApply}
        className="w-full rounded-full bg-black text-white py-4 mt-5 font-satoshi text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-white border outline-none hover:border-black hover:text-black"
      >
        Apply Filter
      </button>
    </div>
  );
}
