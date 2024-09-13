import {
  Text,
  Field,
  RichText,
  Image,
  ImageField,
  Placeholder,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type HeroProps = ComponentProps & {
  fields: {
    Hero: ImageField;
    Slogan: Field<string>;
    Eyebrow: Field<string>;
    Title: Field<string>;
    Body: Field<string>;
  };
};

const HeroSection = (props: HeroProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  // React throws an error if the root element of the component is removed from the DOM.
  // The #cdp-audience-based-home-page-hero div outerHTML will be set by Sitecore Personalize.
  // Thus, we wrap it in another div that becomes the component root element and React is happy.

  const heroBg = props.fields.Hero.value?.src;
  console.log("hero imggg>>>")
  console.log(heroBg)

  const withoutCdp = (
    <>
      <div className="relative" >
      <Image field={props.fields.Hero} className="w-full h-full object-cover object-center" />
      <div className='typo_h4  main_container flex items-center  absolute inset-0 text-white  '>
      <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm text-yellow-200 leading-6 ring-1 ring-white hover:ring-red-400">
              <Text field={props.fields.Title} className="title " />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight  sm:text-6xl">
              <Text field={props.fields.Eyebrow} className="expo" />
            </h1>

            <RichText field={props.fields.Body}  className="subtitle mt-6 text-lg leading-8 " />
           

          
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
        {/* <Placeholder name="jss-hero-section-content" rendering={props.rendering} /> */}
      </div>
       
      </div>
    </>
  );

  return <>{withoutCdp}</>;
};

export const Default = withDatasourceCheck()<HeroProps>(HeroSection);
