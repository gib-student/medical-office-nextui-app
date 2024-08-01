import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { pt_serif_font, Styles } from "../styles";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { WhiteDownArrow } from "./WhiteDownArrow";
import { Divider } from "@nextui-org/divider";
import { useState } from "react";

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
  const [isDescVisible, setIsDescVisible] = useState(false);
  const toggleDescVisibility = () => {
    setIsDescVisible(!isDescVisible);
  };

  return (
    <>
      <Card className="relative border-1 border-gray-100 p-3 mx-5">
        <div className="flex justify-start">
          <Image src={src} alt="Card Image" className="" width={100}></Image>
          {/* Headings */}
          <div className={`ml-2`}>
            <h2 className={`${pt_serif_font.className} ${Styles.cardTitle}`}>
              {title}
            </h2>
            <Link href={href}>{subtitle}</Link>
          </div>
          <div className="w-0.5">
            <Button
              className="absolute right-4 bg-blue-900"
              radius="full"
              isIconOnly
              onPress={toggleDescVisibility}
            >
              <WhiteDownArrow />
            </Button>
          </div>
        </div>
        {isDescVisible && (
          <div>
            <Divider className="my-4" />
            <div>{description}</div>
          </div>
        )}
      </Card>
    </>
  );
}
