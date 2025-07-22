"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();
  return (
    <section className="max-w-[264px] w-full ">
      <Sheet>
        <SheetTrigger>
          <Image
            src={"/icons/hamburger.svg"}
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none">
          <nav className="flex flex-col gap-4 !p-4">
            <Link
              href={"/"}
              className=" flex cursor-pointer items-center gap-1 !px-4"
            >
              <Image
                src={"/icons/logo.svg"}
                width={34}
                height={34}
                alt="Horizon"
              />
              <h1 className="text-26 font-plex font-bold text-black-1">
                Horizon
              </h1>
            </Link>
            <div className="mobilenav-sheet">
              <SheetClose asChild>
                <nav className="flex h-full flex-col gap-6 !pt-16 text-white">
                  {sidebarLinks.map((items) => {
                    const isActive =
                      pathname === items.route ||
                      pathname.startsWith(`${items.route}/`);
                    return (
                      <SheetClose asChild key={items.route}>
                        <Link
                          href={items.route}
                          key={items.label}
                          className={cn("mobilenav-sheet_close w-full", {
                            "bank-gradientt": isActive,
                          })}
                        >
                          <div className="relative size-6">
                            <Image
                              src={items.imgURL}
                              alt={items.label}
                              width={20}
                              height={20}
                              className={cn({
                                "brightness-[3] invert-0": isActive,
                              })}
                            />
                          </div>
                          <p
                            className={cn("text-16 font-semibold text-black-2", {
                              "!text-white": isActive,
                            })}
                          >
                            {items.label}
                          </p>
                        </Link>
                      </SheetClose>
                    );
                  })}
                  <PlaidLink user={user} />
                </nav>
              </SheetClose>
              <Footer user={user} type="mobile"/>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
