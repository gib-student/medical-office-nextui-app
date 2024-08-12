import { pt_serif_font, Styles } from "@/components/styles";

import FeaturedServicesCard from "./FeaturedServicesCard";
import { CardData } from "./CardStrings";

export default function FeaturedServices() {
  return (
    <>
      <h2
        className={`${Styles.subheading} text-center my-11 ${pt_serif_font.className}`}
      >
        Featured Services
      </h2>
      <div className="">
        {CardData.map((card) => (
          <div key={card.id} className="mb-4 flex-col gap-4">
            <FeaturedServicesCard
              description={card.desc}
              href={card.href}
              src={card.src}
              subtitle={card.subtitle}
              title={card.title}
            />
          </div>
        ))}
      </div>
    </>
  );
}
