import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { pt_serif_font } from "../styles";
import { IntegratedMedicalIcon, HealthResourcesIcon } from "../icons";

export default function ServicesAndSupportInfo() {
  return (
    <div className="relative mx-4 mt-10">
      <div className="z-0">
        <Image src="https://cd.trihealth.com/-/media/trihealth-new/home-page/woman-wearing-headscarf-smiling-on-yoga-mat-800.jpg?h=800&iar=0&w=800&hash=2B8E28D1F30FE8A680B8F18F1EA15348" />
      </div>
      <div className="absolute bg-white rounded-s-2xl mt-[-64] right-0 z-10 w-11/12 p-5">
        <h3
          className={`${"text-xl text-blue-900"} ${pt_serif_font.className}`}
          style={{ fontWeight: 700 }}
        >
          Medical and holistic services and support to take control of your
          health
        </h3>
        <div className="my-6 inline-flex justify-center items-center gap-3">
          <IntegratedMedicalIcon />
          <h4 className="font-bold">
            Integrated Medical and Holistic Fitness Center
          </h4>
        </div>
        <p>
          Opened in January 1997, the multiple award-winning Four Seasons
          Fitness & Health Pavilion has been a pioneer in offering medically
          based fitness to Greater Cincinnati and continues to set the standard
          for exercise, rehabilitation, disease prevention and health education.
          Open to the community and conveniently located in the northeast suburb
          of Cincinnati, Ohio in Montgomery at I71 and Pfeiffer Road, the Four
          Seasons Fitness & Health Pavilion is Ohios first certified medical
          fitness facility recognized by the Medical Fitness Association (MFA).
        </p>
        <Link className="my-4 font-bold">
          Four Seasons Fitness and Health Pavilion
        </Link>
        <div className="my-6 inline-flex justify-center items-center gap-3">
          <HealthResourcesIcon />
          <h4 className="font-bold">
            Health Resources and Support for You and Your Family
          </h4>
        </div>
        <p>
          The TriHealth Fitness & Health Pavilion offers a variety of wellness
          classes and events each month to members and nonmembers alike
        </p>
        <Link className="mt-4 font-bold">Search Classes and Events</Link>
      </div>
    </div>
  );
}
