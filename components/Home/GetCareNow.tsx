import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { pt_serif_font, Styles } from "../styles";

export default function GetCareNow() {
  return (
    <div className="mt-9 mb-5">
      <Image
        className="w-full h-30 top-0 border-1 border-gray-300s"
        src="https://placehold.co/1000x600"
        radius="none"
      ></Image>
      <div className="bg-blue-900">
        <h3
          className={`${"mx-3 text-white text-xl"} ${pt_serif_font.className}`}
          style={{ fontWeight: 700 }}
        >
          Improve the Quality of Your Life with Our Full-Service Care Network
        </h3>
        <p className="mx-3 text-white my-4">
          We provide the tools and knowledge to keep yourself healthy and living
          life to the fullest with our extensive network of physicians, nurses,
          clinics, and hospitals, including Bethesda, McCullough-Hyde, and Good
          Samaritan. Whether it's an emergency or a routine checkup—or any
          moment in between—we provide quality care, comprehensive health
          services, and peace of mind for you and your loved ones in Hamilton,
          Butler, Clinton, and Warren counties in southwest Ohio, and across the
          Tri-State region.
        </p>
        <Divider
          className="m-auto w-11/12"
          style={{ backgroundColor: "gray" }}
        />
        <Link className="ml-3 mt-3 text-cyan-300">Get Care Now</Link>
      </div>
    </div>
  );
}
