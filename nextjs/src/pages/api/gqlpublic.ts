import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs/graphql';
import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'temp/config';
import axios from 'axios';

const gqlpublicApi = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const client = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });

  const { componentQuery, queryVariables, gRecaptchaToken } = req.body;

  console.log('ComponentQuery config:SessionGrid');
  console.log(config.sitecoreApiKey + config.graphQLEndpoint);

  console.log('ComponentQuery Query:SessionGrid');
  console.log(componentQuery);

  let resultResponseClient: any = {};

  // Retrieve the secret key from environment variables for the ReCaptcha verification.
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    // If the secret key is not found, log an error and return an appropriate response.
    console.error('RECAPTCHA_SECRET_KEY is not set in environment variables.');
    return res.status(500).json({ success: false, error: 'Server configuration error' });
  }

  // Define the form data for the POST request to the ReCaptcha API.
  const recaptchaFormData = `secret=${secretKey}&response=${gRecaptchaToken}`;

  try {
    // Make a POST request to the Google ReCaptcha verify API.
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      recaptchaFormData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Check the ReCaptcha response for success and a score above a certain threshold.
    if (response.data.success && response.data.score > 0.5) {
      console.log('ReCaptcha status:success');
      console.log('ReCaptcha score:', response.data.score);
      // Return a success response if the verification passes.

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
    } else {
      // Log the failure and return a response indicating the verification did not pass.
      console.error('ReCaptcha verification failed:', response.data);
      return res.status(403).json({ success: false, error: 'ReCaptcha verification failed' });
    }
  } catch (error) {
    // Handle any errors that occur during the API request.
    console.error('Error during ReCaptcha verification:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export default gqlpublicApi;
