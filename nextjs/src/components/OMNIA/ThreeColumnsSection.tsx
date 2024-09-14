import { ComponentProps } from 'lib/component-props';
import {
  Text,
  Field,
  LinkField,
  Link,
  ImageField,
  Image,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';

export type ThreeColumnsSectionProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    LeftLogo: ImageField;
    LeftTitle: Field<string>;
    LeftLink: LinkField;
    MiddleLogo: ImageField;
    MiddleTitle: Field<string>;
    MiddleLink: LinkField;
    RightLogo: ImageField;
    RightTitle: Field<string>;
    RightLink: LinkField;
  };
};

const ThreeColumnsSection = ({ fields, params }: ThreeColumnsSectionProps): JSX.Element => {
  const sxaStyles = `${params?.styles || ''}`;

  return (
    <section className={`section three-col-section ${sxaStyles}`}>
      <div
        className="bg-white py-24 sm:py-32
      bg-gradient-to-r from-violet-50 to-violet-200
      "
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {' '}
              <Text field={fields.Title} />
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              <Text field={fields.Subtitle} />
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <article className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <Link
                  field={fields.LeftLink}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                />
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <Text field={fields.LeftTitle} />
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  <Text field={fields.Subtitle} />
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <Image
                  field={fields.LeftLogo}
                  alt={fields.LeftTitle.value}
                  loading="lazy"
                  className="h-10 w-10 rounded-full bg-gray-50"
                />

                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <Link field={fields.LeftLink}>
                      <span className="absolute inset-0" />
                      {fields.LeftLink.value.text}
                    </Link>
                  </p>
                  <p className="text-gray-600">Learn more</p>
                </div>
              </div>
            </article>
            <article className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <Link
                  field={fields.MiddleLink}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                />
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <Text field={fields.MiddleTitle} />
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  <Text field={fields.Subtitle} />
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <Image
                  field={fields.MiddleLogo}
                  alt={fields.MiddleTitle.value}
                  loading="lazy"
                  className="h-10 w-10 rounded-full bg-gray-50"
                />

                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <Link field={fields.MiddleLink}>
                      <span className="absolute inset-0" />
                      {fields.MiddleLink.value.text}
                    </Link>
                  </p>
                  <p className="text-gray-600">Learn more</p>
                </div>
              </div>
            </article>
            <article className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <Link
                  field={fields.RightLink}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                />
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <Text field={fields.RightTitle} />
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  <Text field={fields.Subtitle} />
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <Image
                  field={fields.RightLogo}
                  alt={fields.RightTitle.value}
                  loading="lazy"
                  className="h-10 w-10 rounded-full bg-gray-50"
                />

                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <Link field={fields.RightLink}>
                      <span className="absolute inset-0" />
                      {fields.RightLink.value.text}
                    </Link>
                  </p>
                  <p className="text-gray-600">Learn more</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>      
    </section>
  );
};

export const Default = withDatasourceCheck()<ThreeColumnsSectionProps>(ThreeColumnsSection);
