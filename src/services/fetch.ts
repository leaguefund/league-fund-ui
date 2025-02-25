// Custom fetch wrapper that includes session information
export const fetchWithSession = async (url: string, options: RequestInit = {}): Promise<Response> => {
    console.log('=== fetchWithSession ===');
    console.log('Initial options:', options);

    // Parse any existing body
    let existingBody = {};
    if (options.body) {
        try {
            existingBody = JSON.parse(options.body as string);
            console.log('Parsed existing body:', existingBody);
        } catch (e) {
            console.warn('Could not parse existing body:', e);
        }
    }

    // Get session values from SessionStorage
    const sessionId = sessionStorage.getItem('sessionID');
    const sessionExpiry = sessionStorage.getItem('sessionExpiry');

    // Merge existing body with session data
    const finalBody = {
        ...existingBody,
        sessionID: sessionId || '',
        sessionExpiry: sessionExpiry || ''
    };

    // Create final options with POST method enforced
    const finalOptions: RequestInit = {
        method: 'POST',  // Set method first
        ...options,      // Spread original options
        headers: {
            ...options.headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(finalBody)
    };

    // Force POST method again after spread
    finalOptions.method = 'POST';

    console.log('Final request details:');
    console.log('- URL:', url);
    console.log('- Method:', finalOptions.method);
    console.log('- Headers:', finalOptions.headers);
    console.log('- Body:', finalBody);

    // Make the request
    return fetch(url, finalOptions);
}; 