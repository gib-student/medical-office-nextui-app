import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";

import { GoldStandardIcon } from "../icons";
import { pt_serif_font } from "../styles";

export default function AwardsAndStatistics() {
  return (
    <div className="mx-5">
      <div
        className="relative rounded-lg mt-6 bg-cover bg-no-repeat rounded-2xl p-3"
        style={{
          backgroundImage:
            'url("https://cd.trihealth.com/-/media/trihealth-new/home-page/home-page-gold-standard-in-nursing-680x740.jpg?h=780&iar=0&w=640&hash=D08E9324278DDACB88CAC507A54A2DCB")',
        }}
      >
        {/* Black tint */}
        <div className="absolute rounded-lg top-0 left-0 w-full h-full bg-black opacity-30 z-0" />
        <div className="relative z-10">
          <h2
            className={`${pt_serif_font.className} ${"text-yellow-400 text-4xl"}`}
            style={{ fontWeight: 700 }}
          >
            Gold Standard
          </h2>
          <h2
            className={`${pt_serif_font.className} ${"text-white text-4xl mb-3"}`}
            style={{ fontWeight: 700 }}
          >
            in Nursing
          </h2>
          <p className="text-white">
            The American Nurses Credentialing Center&apos;s Magnet Recognition
            Program&reg; distiguishes organizations that meet rigorous standards
            for nursing excellence. Four Seasons is one of the fewer than 30
            health care systems in this nation to have this prestigious
            designation.
          </p>
          <Link className="mt-4 text-cyan-300" style={{ fontWeight: 700 }}>
            Learn more about ANCC Magnet Recognition Program
          </Link>
          <Divider className="my-3" style={{ backgroundColor: "white" }} />
          <div className="flex justify-center">
            <Image src="https://cd.trihealth.com/-/media/trihealth-new/magnet-recognition-logo.png?h=112&iar=0&w=150&hash=A4218E9235239022A90FB9E6A7090EDB" />
          </div>
        </div>
      </div>
      <div className="h-14" />
      <Divider className="mb-5" />
      <div className="flex">
        <GoldStandardIcon item={0} />
        <div>
          <h3
            className={`${pt_serif_font.className} ${"text-xl mb-1"}`}
            style={{ fontWeight: 700 }}
          >
            170-Year Legacy
          </h3>
          <p>
            between Good Samaritan and Bethesda North Hospitals in providing
            exceptional care. We have seen and treated millions of patients and
            have the experience to care for you throughout your life.
          </p>
          <Link className="font-bold" underline="always">
            View All Services
          </Link>
        </div>
      </div>
      <Divider className="mb-5 mt-6" />
      <div className="flex">
        <GoldStandardIcon item={1} />
        <div>
          <h3
            className={`${pt_serif_font.className} ${"text-xl mb-1"}`}
            style={{ fontWeight: 700 }}
          >
            1 in 3 Babies
          </h3>
          <p>
            in the Atlanta area we are delivered at Four Seaons hospitals.
            We&apos;re the experts parents trust with their newborns.
          </p>
          <Link className="font-bold" underline="always">
            Women&apos;s Health
          </Link>
        </div>
      </div>
      <Divider className="mb-5 mt-6" />
      <div className="flex">
        <GoldStandardIcon item={2} />
        <div>
          <h3
            className={`${pt_serif_font.className} ${"text-xl mb-1"}`}
            style={{ fontWeight: 700 }}
          >
            15 minutes
          </h3>
          <p>
            With the largest primary care network in the region, Four Seasons
            practices are usually no more than 15 minutes from where most
            patients live in the four-county.
          </p>
          <Link className="font-bold" underline="always">
            Primary Care
          </Link>
        </div>
      </div>
    </div>
  );
}
