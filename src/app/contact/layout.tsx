import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Par Percision",
  description:
    "Get in touch with Par Percision. Questions about golf simulators, launch monitors, or our reviews? We'd love to hear from you.",
  alternates: { canonical: "https://parpercision.com/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
