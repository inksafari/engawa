// https://github.com/chandy/chrishandy.net/blob/master/src/pages/apitest.json.ts
import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ params, request }) => {
  return new Response(
    JSON.stringify({
      message: 'This was a GET!',
    }),
  )
}

export const POST: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: 'This was a POST!',
    }),
  )
}

export const DELETE: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: 'This was a DELETE!',
    }),
  )
}

export const ALL: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: `This was a ${request.method}!`,
    }),
  )
}
