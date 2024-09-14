import Link from 'next/link';
import {
  Text,
  Image,
  withDatasourceCheck,
  useSitecoreContext,
  LayoutServicePageState,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { Vendor } from 'src/types/vendor';

type VendorsGridProps = ComponentProps & {
  fields: {
    items: Vendor[];
  };
};

const VendorsGrid = (props: VendorsGridProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const isPageEditing = sitecoreContext.pageState === LayoutServicePageState.Edit;
  const hasVendors = !!props.fields;

  !hasVendors && console.warn('Missing Datasource Item');

  const businessLogicForRating = (str:any) => {
    return ('*'.repeat(str)).substring(0, 5) ;
  };

  const pageEditingMissingDatasource = !hasVendors && isPageEditing && (
    <p>Missing Datasource Item</p>
  );

  

  const vendors =
    props.fields?.items &&
    props.fields.items.map((vendor, index) => (
      
      <Link key={index} href={vendor.url} passHref className="grid-item">
        <div className="item-details"></div>
        <li key={vendor.fields.Name.value}>
          <div className="flex items-center gap-x-6">
            <Image
              field={vendor.fields.Logo}
              alt={vendor.fields.Name.value}
              className="border border-gray-400 h-16 w-16 rounded-full"
            />

            <div>
              <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                <Text field={vendor.fields.Name} />
              </h3>
              <p className="text-base font-semibold leading-6 text-indigo-600">Business logics : {businessLogicForRating(vendor.fields.Name.value.length) }</p>
             
            </div>
          </div>
        </li>
      </Link>
    ));

  const vendorsGrid = hasVendors && (
    <section className="section px-8 py-8 border border-gray-400">
      <div className=" py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet our elite vendors
            </h2>
            <br></br>
            <hr/>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim
              vitae ullamcorper suspendisse.
            </p>
           
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            {vendors}
          </ul>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {vendorsGrid}
      {pageEditingMissingDatasource}
    </>
  );
};

export const Default = withDatasourceCheck()<VendorsGridProps>(VendorsGrid);
