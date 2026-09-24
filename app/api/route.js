// In route.js we can define the HTTP methods that we want to support for this route. For example, we can define a GET method that returns a JSON response with some data, and a POST method that creates a new resource. We can also define other methods like PUT, PATCH, and DELETE if we want to support updating or deleting resources.

export async function GET() {
  // Request and Response are built-in Web APIs for receiving requests and sending responses. These are available in any JavaScript environment that supports the Fetch API, such as modern browsers and Node.js with the appropriate polyfills.

  // Not only for Next.js, but also for other frameworks like Express.js, Koa.js, and Hapi.js. We can use them to create RESTful APIs, GraphQL APIs, or any other type of web service that requires HTTP communication.

  // Request is a built-in Web API for receiving requests. It has properties like method, headers, and body that we can use to access the request data. We can also use methods like json() to parse the request body as JSON.

  // Request.json();

  // new Response();
  // Response.prototype;
  // Response.redirect();
  // Response.error();

  return Response.json({ test: 'test' });
}

export async function POST() { }

export async function PUT() { }

export async function PATCH() { }

export async function DELETE() { }
