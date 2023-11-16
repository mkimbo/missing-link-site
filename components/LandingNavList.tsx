import { NavData } from "@/types/common";
import NavCard from "./NavCard";

interface Props {
  items: NavData[];
}

const LandingNavList: React.FC<Props> = ({ items }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <NavCard key={item.route} data={item} />
        ))}
      </div>
    </div>
  );
};

export default LandingNavList;
