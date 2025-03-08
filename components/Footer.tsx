import { Divider } from "@nextui-org/divider";
import { Logo } from "@/components/icons";
import { 
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu, 
  NavbarMenuItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

export default function Footer() {
  type link = {
    label: string;
    url: string;
  };
  let major_links: link[] = [
    {label: "Patients & Visitors", url: "#"},
    {label: "Medical Professionals", url: "#"},
    {label: "Team Members", url: "#"},
    {label: "Join Us", url: "#"},
    {label: "Affiliated Websites", url: "#"}
  ];
  let minor_links: link[] = [
    {label: "About Four Seasons", url: "#"},
    {label: "Four Seasons News", url: "#"},
    {label: "Inclusion and Belonging", url: "#"},
    {label: "Four Seasons Foundations", url: "#"},
    {label: "Community Health Improvement", url: "#"},
    {label: "Contact Us", url: "#"}
  ];

  return (
    <>
      {/* Social media nav */}
      <nav className="justify-center flex bg-yellow-400 py-3">
        <a href="https://www.facebook.com/" className="inline-block p-2">
          <svg viewBox="0 0 320 512" className="w-auto h-6 fill-indigo-950 inline-block">
            <path d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
          </svg>
          <img src="https://www.trihealth.com/images/external-link.png" className="ml-1 inline-block" alt="External link" ></img>
        </a>
        <a href="https://x.com/?lang=en" className="inline-block p-2">
          <svg
            viewBox="0 0 512 512"
            aria-describedby="Twitter Logo"
            className="w-auto h-6 fill-indigo-950 inline-block"
          >
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9L389.2 48zm-24.8 373.8h39.1L151.1 88h-42l255.3 333.8z"></path>
          </svg>
          <img src="https://www.trihealth.com/images/external-link.png" className="ml-1 inline-block" alt="External link" ></img>
        </a>
        <a href="https://www.instagram.com/" className="inline-block p-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-describedby="Instagram Logo" className="w-auto h-6 fill-indigo-950 inline-block"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
          <img src="https://www.trihealth.com/images/external-link.png" className="ml-1 inline-block" alt="External link" ></img>
        </a>
        <a href="https://www.linkedin.com/" className="inline-block p-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-describedby="Instagram Logo" className="w-auto h-6 fill-indigo-950 inline-block"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
          <img src="https://www.trihealth.com/images/external-link.png" className="ml-1 inline-block" alt="External link" ></img>
        </a>
      </nav>

      <div className="bg-indigo-950 text-white px-3 pb-4">
        {/* Logo */}
        <a href="/" className="flex items-center justify-center py-5">
          <Logo />
          <p className="font-bold pl-1 text-xl">Four Seasons</p>
        </a>
        <Divider style={{ backgroundColor: "gray" }}/>
        {/* Contact information */}
        {/* Address */}
        <div className="pt-6 pb-3">
          <p className="font-bold">Four Seasons</p>
          <p>625 Eden Park Drive</p>
          <p>Cincinnati, OH 45202</p>
        </div>
        {/* Phone */}
        <div className="py-3">
          <p className="font-bold">Phone:</p>
          <p>(123) 456-7890</p>
        </div>
        {/* Physician Referral Line */}
        <div className="py-3">
          <p className="font-bold">Physician Referral Line:</p>
          <p>(123) 456-7890</p>
        </div>
        {/* Transfer a patient */}
        <div className="py-3">
          <p className="font-bold">Transfer a Patient:</p>
          <p>(123) 456-7890</p>
        </div>
        {/* Footer nav */}
        <ul className="mt-3">
          {major_links.map((link, index) => (
            <li key={`${link.label}-${index}`}>
              <Divider style={{ backgroundColor: "gray" }}/>
              <Link showAnchorIcon className="py-4 text-white" size="lg">
                {link.label}
              </Link>
              <Divider style={{ backgroundColor: "gray" }}/>
            </li>
          ))}
        </ul>
        <ul className="mt-5">
          {minor_links.map((link, index) => (
            <li key={`${link.label}-${index}`}>
              <Link className="py-3 text-white font-bold" size="md">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Corporation info */}
        <strong className="text-xs">Four Seasons Population Health Organization (FSPHO)</strong>
        <p className="text-xs">The Fur Seasons Population Health Organization (FSPHO) proudly provides easily accessible and inclusive care to people of all ages, backgrounds, demographics, and walks of life.
          <br />
        We look forward to offering high-quality, cost-effective health services - everyone is welcome here.
        </p>
        <Divider className="my-6" style={{ backgroundColor: "gray" }}/>
        {/* Copyright */}
        <p className="text-xs">2025 FOUR SEASONS</p>
        {/* Privacy statements, terms & conditions and price transparency */}
        <nav></nav>
      </div>
      {/* Space from bottom to accomodate for button */}
      <div className="h-14"></div>
    </>
  );
}
