
interface TrintTextExportAPIResponse {
  title: string;
  url: string;
}

export async function fetchTranscriptText(transcriptId: string) {
  const { TRINT_API_URL, TRINT_API_KEY } = process.env;

  if (!TRINT_API_URL) {
    throw new Error('Trint API URL not configured. Check .env');
  }

  if (!TRINT_API_KEY) {
    throw new Error('Trint API key not configured. Check .env');
  }

  // URL and headers
  const url = `${TRINT_API_URL}/export/text/${transcriptId}`;
  const headers = {
    accept: 'application/json',
    'api-key': TRINT_API_KEY,
  };

  // Call the Trint API
  const trintTextExportApiResponse = await fetch(url, {
    method: 'GET',
    headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`,
      );
    }

    return response.json() as unknown as TrintTextExportAPIResponse;
  });


  const text = await fetch(trintTextExportApiResponse.url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`,
        );
      }
      return response.text(); // Parse as text
    });

  return { text };
}
