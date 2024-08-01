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
      {CardData.map((card) => (
        <FeaturedServicesCard
          key={card.id}
          title={card.title}
          subtitle={card.subtitle}
          href={card.href}
          photo={card.photo}
          description={card.desc}
        />
      ))}
    </>
  );
}
