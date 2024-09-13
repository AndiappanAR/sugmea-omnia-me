import Link from 'next/link';
import React, { useState } from 'react';
import { ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type MainNavigationProps = ComponentProps & {
  fields: {
    data: {
      item: {
        headerLogo: {
          jsonValue: ImageField;
          alt: string;
        };
      };
      links: {
        children: {
          results: [
            {
              displayName: string;
              field: {
                jsonValue: {
                  value: {
                    anchor: string;
                    href: string;
                    linktype: string;
                    target: string;
                    text: string;
                    url: string;
                  };
                };
              };
            }
          ];
        };
      };
    };
  };
};

// From tailwind

import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// From tailwind

const MainNavigation = (props: MainNavigationProps): JSX.Element => {
  console.log('MainNavigationProps >>>>');
  console.log(props);

  // From tailwind
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // From tailwind

  // const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <>
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">OMNIAA</span>
            <Image
              field={props.fields.data.item.headerLogo.jsonValue}
              alt={props.fields.data.item.headerLogo.alt}
              class="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {props.fields?.data?.links?.children?.results?.map((item, index) => (
            <Link
              href={item.field?.jsonValue?.value?.href ?? '#'}
              prefetch={false}
              className="text-sm font-semibold leading-6 text-white"
              key={index}
            >
              {item.displayName}
            </Link>
          ))}
        </PopoverGroup>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">OMNIAA</span>
              <Image
                field={props.fields.data.item.headerLogo.jsonValue}
                alt={props.fields.data.item.headerLogo.alt}
                class="h-8 w-auto"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {props.fields?.data?.links?.children?.results?.map((item, index) => (
                  <Link
                    href={item.field?.jsonValue?.value?.href ?? '#'}
                    prefetch={false}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  text-gray-400 hover:bg-red-300"
                    key={index}
                  >
                    {item.displayName}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export const Default = MainNavigation;
