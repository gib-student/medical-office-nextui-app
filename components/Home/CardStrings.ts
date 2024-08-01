interface card {
    id: string,
    title: string,
    subtitle: string,
    href: string,
    photo: string,
    desc: string,
}

export const CardData: card[] = [
    {
        id: "primary_care",
        title: "Primary Care",
        subtitle: "Visit a Physician",
        href: "#",
        photo: "https://placehold.co/400",
        desc: "Regular visits to our experienced primary care providers (PCPs) and pediatricians can help you and your family live your best lives. Our family doctors know and care about your personal health history, can recognize issues early, and will refer you to the best specialists when necessary. They’re with you for the long haul.",
    },
    {
        id: "telehealth",
        title: "Telehealth",
        subtitle: "Telehealth Options",
        href: "#",
        photo: "https://placehold.co/400",
        desc: "Telehealth is the delivery of health care related services using electronic or telecommunication technologies. Explore the many ways TriHealth is using telehealth to improve our patients’ care.",
    },
    {
        id: "priority_care",
        title: "Priority Care",
        subtitle: "Reserve Your Spot",
        href: "#",
        photo: "https://placehold.co/400",
        desc: "Quickly and conveniently access care at our Priority Care locations throughout the Tri-State area for minor injuries, lab testing, vaccinations, on-site X-rays, and more. Reserve your spot and connect with a care provider today.",
    },
    {
        id: "trihealth_clinic",
        title: "TriHealth Clinic",
        subtitle: "Find a Location",
        href: "#",
        photo: "https://placehold.co/400",
        desc: "Take comfort in knowing that we’re nearby. Our medical team is here to provide you with expert care, so you can get back to what matters most. It’s another way TriHealth is honoring our mission to improve the health of the people we serve.",
    },
]
