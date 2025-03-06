import { Divider } from "@nextui-org/divider";
export default function Footer() {
  return (
    <>
      {/* Social media nav */}
      <nav>
        <a href="https://www.facebook.com/" aria-label="Find us on Facebook">
          <svg viewBox="0 0 320 512" className="w-auto h-6 fill-indigo-950">
            <path d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
          </svg>
        </a>
        <a href="https://x.com/?lang=en">
          <svg
            viewBox="0 0 512 512"
            aria-describedby="Twitter Logo"
            className="w-auto h-6 fill-indigo-950"
          >
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9L389.2 48zm-24.8 373.8h39.1L151.1 88h-42l255.3 333.8z"></path>
          </svg>
        </a>
      </nav>

      {/* Logo */}
      <div></div>
      <Divider></Divider>
      {/* Contact information */}
      <div></div>
      {/* Footer nav */}
      <nav></nav>
      {/* Corporation info */}
      <p></p>
      <Divider></Divider>
      {/* Copyright */}
      <p></p>
      {/* Privacy statements, terms & conditions and price transparency */}
      <nav></nav>
      {/* Space from bottom */}
      <div className="h-14"></div>
    </>
  );
}
