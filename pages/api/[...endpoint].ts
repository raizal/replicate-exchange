// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, url } = req;
  const URI = url?.replace(/\/api*/, '') || '';

  try {
    const { data } = await axios({
      method,
      url: process.env.RESTAPI_ENDPOINT + URI,
      headers: {
        'x-api-key': process.env.RESTAPI_APIKEY || '',
      },
    });

    res.status(200).json(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      res.status(Number(error.code)).json({
        status: error.code,
        message: error.message,
      });
    }

    res.status(500).json({
      status: 500,
      message: 'internal server error',
    });
  }
}
