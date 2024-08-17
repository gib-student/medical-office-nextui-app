import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";

import { pt_serif_font } from "@/components/styles";

export default function MyChartInfo() {
  return (
    <div className="relative">
      <div className="h-24 bg-white" />
      <div className="absolute top-1 flex justify-center w-full">
        <Image
          className="w-48"
          radius="none"
          src="https://cd.trihealth.com/-/media/trihealth-new/home-page/phone2.png?h=524&iar=0&w=384&hash=8CAE7283793EA8452F27E579AE5D1676"
        />
      </div>
      <div className="bg-gradient-to-b from-neutral-950 to-blue-900 pb-4">
        <div className="h-44" />
        <Divider className="" style={{ backgroundColor: "gray" }} />
        <h2
          className={`${"text-center text-white text-xl mx-4 my-4"} ${pt_serif_font.className}`}
          style={{ fontWeight: 700 }}
        >
          Easy Access To Your Patient Information Online with MyChart
        </h2>
        <p className="text-center text-white mx-4">
          MyChart makes it simple to keep track of your health records,
          appointment notes, prescriptions, and test results online. Ready to
          get started? Set up an account through your primary car
          physician&apos;s office with an activation code or sign up online.
        </p>
        <div className="p-3">
          <Button
            className="rounded-md bg-blue-600 border-2 border-blue-400 text-white w-full"
            size="lg"
          >
            Set up account
          </Button>
        </div>
        <div className="p-3">
          <Button
            className="rounded-md bg-transparent border-2 border-yellow-400 text-yellow-400 w-full"
            size="lg"
          >
            Learn more about MyChart
          </Button>
        </div>
        <p className="text-center text-white mx-auto">
          Already have an account?&#8200;
          <span>
            <Link className="my-2 text-cyan-400" underline="always">
              Sign In
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
