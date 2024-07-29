import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { url } from "inspector";
import background from "../public/family-practice.jpg";

export default function Home() {
  return (
    <div
      className="bg-local"
      style={{
        backgroundImage:
          "url('https://github.com/gib-student/medical-office-nextui-app/blob/hero/public/family-practice.jpg?raw=true')",
        height: "20vh",
        // width: "auto",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // objectFit: "contain",
        maxWidth: "100%",
        // objectPosition: "center",
      }}
    ></div>
  );
}
