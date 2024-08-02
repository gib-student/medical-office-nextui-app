import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";

export default function ServicesAndSupportInfo() {
  return (
    <div className="mx-4 mt-10">
      <Image src="https://placehold.co/600x600" />
      <div>
        <h3 className={`$""`}>
          Medical and holistic services and support to take control of your
          health
        </h3>
        <h4>Integrated Medical and Holistic Fitness Center</h4>
        <p>
          Opened in January 1997, the multiple award-winning Four Seasons
          Fitness & Health Pavilion has been a pioneer in offering medically
          based fitness to Greater Cincinnati and continues to set the standard
          for exercise, rehabilitation, disease prevention and health education.
          Open to the community and conveniently located in the northeast suburb
          of Cincinnati, Ohio in Montgomery at I71 and Pfeiffer Road, the Four
          Seasons Fitness & Health Pavilion is Ohio&apos;'s first certified
          medical fitness facility recognized by the Medical Fitness Association
          (MFA).
        </p>
        <Link>Four Seasons Fitness and Health Pavilion</Link>
        <h4>Health Resources and Support for You and Your Family</h4>
        <p>
          The TriHealth Fitness & Health Pavilion offers a variety of wellness
          classes and events each month to members and nonmembers alike
        </p>
        <Link>Search Classes and Events</Link>
      </div>
    </div>
  );
}
