import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { pt_serif_font, Styles } from "../styles";

interface Props {
  title: string;
  subtitle: string;
  href: string;
  src: string;
  description: string;
}

export default function FeaturedServicesCard({
  title,
  subtitle,
  href,
  src,
  description,
}: Props) {
  return (
    <>
      <Card className="relative border-1 border-gray-100 p-3 mx-5">
        <div className="flex justify-start">
          <Image src={src} alt="Card Image" className="" width={100}></Image>
          {/* Headings */}
          <div className={`ml-4`}>
            <h2 className={`${pt_serif_font.className} ${Styles.cardTitle}`}>
              {title}
            </h2>
            <Link href={href}>{subtitle}</Link>
          </div>
        </div>
      </Card>
    </>
  );
}
