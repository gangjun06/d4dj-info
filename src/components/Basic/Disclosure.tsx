import { ReactNode } from "react";
import { Disclosure as HeadlessDisclosure } from "@headlessui/react";
import { HiOutlineChevronUp } from "react-icons/hi";
const { Button, Panel } = HeadlessDisclosure;

export const Disclosure = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <HeadlessDisclosure>
    {({ open }) => (
      <>
        <Button className="disclosure-btn">
          {title}
          <HiOutlineChevronUp
            className={`${
              open ? "transform rotate-180" : ""
            } w-5 h-5 text-purple-500`}
          />
        </Button>
        <Panel className="pb-2">{children}</Panel>
      </>
    )}
  </HeadlessDisclosure>
);
