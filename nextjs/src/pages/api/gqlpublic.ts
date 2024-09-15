import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs/graphql';
import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';

const gqlpublicApi = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const client = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });

  const {
    componentQuery,
    queryVariables,
    //,     captchaResponse
  } = req.body;

  console.log('ComponentQuery config:SessionGrid');
  console.log(config.sitecoreApiKey + config.graphQLEndpoint);

  console.log('ComponentQuery Query:SessionGrid');
  console.log(componentQuery);

  let resultResponseClient: any = {};

  await client
    .request(componentQuery, queryVariables)
    .then((result) => {
      resultResponseClient = result;
      console.log('ComponentQuery Result:SessionGrid');
      console.log(result);
    })
    .catch((e) => {
      console.log('ComponentQuery Error:SessionGrid');
      console.error(e);
      return res.status(500).send(e);
    });

  return res.status(200).send(resultResponseClient);
};

export default gqlpublicApi;
