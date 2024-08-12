interface card {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  src: string;
  desc: string;
}
// const srcPlaceholder = "https://placehold.co/100";

export const CardData: card[] = [
  {
    id: "primary_care",
    title: "Primary Care",
    subtitle: "Visit a Physician",
    href: "#",
    src: "https://cd.trihealth.com/-/media/trihealth-new/home-page/home-page-featured-services-primary-care-250.jpg?h=250&iar=0&w=250&hash=DEBE7411964B7CB0BFABB4B9CD8EFC98&quot",
    desc: "Regular visits to our experienced primary care providers (PCPs) and pediatricians can help you and your family live your best lives. Our family doctors know and care about your personal health history, can recognize issues early, and will refer you to the best specialists when necessary. They’re with you for the long haul.",
  },
  {
    id: "telehealth",
    title: "Telehealth",
    subtitle: "Telehealth Options",
    href: "#",
    src: "https://cd.trihealth.com/-/media/trihealth-new/home-page/home-page-featured-services-telehealth-250.jpg?h=250&iar=0&w=250&hash=AFD29E46650F679C0C9A7D93D6A8FEA2",
    desc: "Telehealth is the delivery of health care related services using electronic or telecommunication technologies. Explore the many ways TriHealth is using telehealth to improve our patients’ care.",
  },
  {
    id: "priority_care",
    title: "Priority Care",
    subtitle: "Reserve Your Spot",
    href: "#",
    src: "https://cd.trihealth.com/-/media/trihealth-new/home-page/home-page-featured-services-priority-care-250.jpg?h=250&iar=0&w=250&hash=CD926B8233D72A1B3447CED28078FD90",
    desc: "Quickly and conveniently access care at our Priority Care locations throughout the Tri-State area for minor injuries, lab testing, vaccinations, on-site X-rays, and more. Reserve your spot and connect with a care provider today.",
  },
  {
    id: "trihealth_clinic",
    title: "Four Seasons Clinic",
    subtitle: "Find a Location",
    href: "#",
    src: "https://cd.trihealth.com/-/media/jumpstart/locations/walgreens-colerain-250x250.jpg?h=250&iar=0&w=250&hash=31621BA5C325D595D7D4F7AB144F73A7",
    desc: "Take comfort in knowing that we’re nearby. Our medical team is here to provide you with expert care, so you can get back to what matters most. It’s another way TriHealth is honoring our mission to improve the health of the people we serve.",
  },
];
