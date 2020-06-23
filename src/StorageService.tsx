var graph = require("@microsoft/microsoft-graph-client");

function getAuthenticatedClient(accessToken: string) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done: any) => {
      done(null, accessToken);
    },
  });

  return client;
}

// <getEventsSnippet>
export async function getEvents(accessToken: string) {
  const client = getAuthenticatedClient(accessToken);

  const events = await client
    .api("/me/events")
    .select("subject,organizer,start,end")
    .orderby("createdDateTime DESC")
    .get();

  return events;
}
