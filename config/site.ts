export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Four Seasons Medical",
  description: "Good health begins with human care.",
  navItems: [
    {
      label: "MyChart Login",
      href: "/myChartLogin"
    },
    {
      label: "Pay a Bill",
      href: "/payABill",
    },
    {
      label: "Careers",
      href: "/careers",
    },
    {
      label: "Donate",
      href: "/donate",
    },
    {
      label: "Contact Us",
      href: "/contactUs",
    },
  ],
  navMenuItems: [
    {
      label: "Find a Doctor",
      href: "/findADoctor",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Locations",
      href: "/locations",
    },
    {
      label: "Patients & Visitors",
      href: "/patientsAndVisitors",
    },
    {
      label: "Resources",
      href: "/resources",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
