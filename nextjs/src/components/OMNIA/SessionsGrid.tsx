import { LayoutServicePageState, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { GraphQLSession } from 'src/types/session';
import SessionItem from './SessionItem';
import { useState } from 'react';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

type SessionsGridProps = ComponentProps & {
  fields: {
    data: {
      item: {
        children: {
          results: GraphQLSession[];
        };
      };
    };
  };
};

const SessionsGrid = (props: SessionsGridProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const [sessions, setSessions] = useState<GraphQLSession[]>(
    props.fields?.data?.item?.children?.results || []
  );
  const [noResults, setNoResults] = useState(false); // State to track if there are no results
  const [resultsType, setresultsType] = useState(false); // State to track if there are no results

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async () => {
    if (!executeRecaptcha) {
      console.error('ReCAPTCHA : not available');
      return;
    }

    await executeRecaptcha('enquiryFormSubmit').then(async (gRecaptchaToken) => {
      console.log('ReCAPTCHA : key' + gRecaptchaToken);

      const componentQuery = `query(
    $language: String!
    $orderByField: String!
    $orderDirection: OrderByDirection = ASC
    $searchKeyword: String = ""
  ) {
    search(
      first: 100
      orderBy: { name: $orderByField, direction: $orderDirection }
      where: {
        AND: [
          {
            name: "_path"
            value: "{68DC89A4-1B04-59A8-9C4E-3B49D6C61052}"
            operator: CONTAINS
          }
          { name: "_language", value: $language }
          {
            OR: [
              { name: "name", value: $searchKeyword, operator: CONTAINS }
              #{ name: "pageTitle", value: $searchKeyword, operator: CONTAINS }
              #{ name: "Description", value: $searchKeyword, operator: CONTAINS }
            ]
          }
        ]
      }
    ) {
      total
      pageInfo {
        endCursor
      }
      results {
        ... on Session {
          itemName: name
          name: field(name: "name") {
            value
          }
          premium {
            value
          }
          url {
            path
          }
          image {
            jsonValue
          }
          day {
            ... on MultilistField {
              targetItems {
                name: field(name: "name") {
                  value
                }
              }
            }
          }
          timeslots {
            ... on MultilistField {
              targetItems {
                name: field(name: "name") {
                  value
                }
              }
            }
          }
          speakers {
            ... on MultilistField {
              targetItems {
                ... on Speaker {
                  name: field(name: "name") {
                    value
                  }
                  url {
                    path
                  }
                  role {
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
    `;
      setNoResults(false);
      noResults;

      const queryVariables = {
        language: 'en',
        orderByField: 'name',
        orderDirection: 'ASC',
        searchKeyword: searchValue,
      };

      const dataToSend = {
        componentQuery: componentQuery,
        queryVariables: queryVariables,
        gRecaptchaToken: gRecaptchaToken,
      };

      const response = await fetch('/api/gqlpublic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend), // Passing data in the body
      });

      const result = await response.json();

      if (result?.search?.results) {
        setSessions(result.search.results);
        if (result.search.results.length === 0) {
          setNoResults(true); // Set noResults to true if no sessions found
        }
      } else {
        setNoResults(true); // Set noResults to true if no results are returned
      }

      setresultsType(true);

      console.log('ComponentQuery Result:SessionGrid');
      console.log(result);
    });
  };
  const handleInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const { sitecoreContext } = useSitecoreContext();

  const isPageEditing = sitecoreContext.pageState === LayoutServicePageState.Edit;
  const hasSessions = !!props.fields?.data?.item;

  const sxaStyles = `${props.params?.styles || ''}`;

  !hasSessions && console.warn('Missing Datasource Item');

  const pageEditingMissingDatasource = !hasSessions && isPageEditing && (
    <p>Missing Datasource Item</p>
  );

  const sessionsGrid =
    hasSessions && sessions.length > 0 ? (
      <div className={`item-grid sessions-grid gap-8 px-8 py-8 ${sxaStyles}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((session, index) => (
            <SessionItem key={index} session={session} />
          ))}
        </div>
      </div>
    ) : (
      <div className="px-8 py-8">
        <p className="text-lg text-center">No results found</p>
      </div>
    );

  const resultTypeDisplay = resultsType ? 'Connected GQL results' : 'Integrated GQL results';

  return (
    <>
      <br />
      <br />
      <div className="grid grid-cols-1 gap-4 border  px-8 py-8">
        <div>
          <form className="max-w-sm mx-auto" action="javascript:void(0);">
            <label
              htmlFor="rootFolder"
              className="mb-2 flex text-lg font-medium text-gray-900 dark:text-gray-300"
            >
              {' '}
              Search session using free text{' '}
            </label>
            <div className="mb-6 flex gap-4">
              <input
                type="rootFolder"
                id="rootFolder"
                className="block grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder=""
                value={searchValue}
                onChange={handleInputChange} // Track input value changes
              />
              <button
                onClick={handleSubmit}
                className="rounded-lg hh bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 border px-8 py-8 content-center">
        <h2 className="text-4xl font-bold text-indigo-500">{resultTypeDisplay} ...</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 border  px-8 py-8">
        {sessionsGrid}
        {pageEditingMissingDatasource}
      </div>
      <script
        async
        src="https://www.google.com/recaptcha/api.js?render=6LcG3e4aAAAAAB4LA6IsLetrSnrsX_9_YHkd3epL"
      ></script>
    </>
  );
};

export const Default = SessionsGrid;
