import FeaturedServicesCard from "./FeaturedServicesCard";
import { CardData } from "./CardStrings";
import { pt_serif_font, Styles } from "../styles";

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
          <div className="key={card.id} mb-4 flex-col gap-4">
            <FeaturedServicesCard
              description={card.desc}
              href={card.href}
              subtitle={card.subtitle}
              src={card.src}
              title={card.title}
            />
          </div>
        ))}
      </div>
    </>
  );
}
