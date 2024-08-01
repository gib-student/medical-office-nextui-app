import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

interface Props {
  title: string;
  subtitle: string;
  href: string;
  photo: string;
  description: string;
}

export default function FeaturedServicesCard({
  title,
  subtitle,
  href,
  photo,
  description,
}: Props) {
  return (
    <>
      <Card className="flex relative border-1 border-gray-100 p-7 mx-5">
        <Image src={photo} alt="Card Image" className="absolute left-4"></Image>
        <h2 className=""></h2>
      </Card>
    </>
  );
}
