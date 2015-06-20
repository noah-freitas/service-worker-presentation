'use strict';

var version = 1;

self.addEventListener('install'  , handleInstall);
self.addEventListener('activate' , handleActivate);
self.addEventListener('fetch'    , handleFetch);

// handleInstall :: InstallEvent -> undefined
function handleInstall(e) {
    console.log('[INSTALL] event:', e);
}

// handleActivate :: ExtendableEvent -> undefined
function handleActivate(e) {
    console.log('[ACTIVATE] event:', e);
}

// handleFetch :: FetchEvent -> undefined
function handleFetch(e) {
    console.log('[FETCH] event:', e);

    if (isVersionRequest(e.request)) e.respondWith(versionResponse());
    else e.respondWith(fetch(e.request).then(logAndReturnResponse));

    // isVersionRequest :: Request -> Boolean
    function isVersionRequest(req) {
        var url = new URL(req.url);

        return req.method   === 'GET'
            && url.pathname === '/version';
    }

    // logAndReturnResponse :: Response -> Response
    function logAndReturnResponse(resp) {
        console.log('[RESPONSE] response:', resp);
        return resp;
    }

    // versionResponse :: undefined -> Response
    function versionResponse() {
        console.log('Reporting version', version);
        return new Response(JSON.stringify({ version : version }), {
            headers : new Headers({ 'Content-Type' : 'application/json' })
        });
    }
}
