export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Four Seasons Medical",
  description: "Good heath begins with human care.",
  navItems: [
    {
      label: "MyChart Login",
      href: "/mychartlogin"
    },
    {
      label: "Pay a Bill",
      href: "/payabill",
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
      href: "/contactus",
    },
  ],
  navMenuItems: [
    {
      label: "Find a Doctor",
      href: "/findadoctor",
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
      href: "/patientsandvisitors",
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
