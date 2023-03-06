import { renderApp } from './index';

if (module.hot) {
    module.hot.accept('./index.js', () => {
        console.log('Accepted the updated index.js module');

        renderApp();
    });

    module.hot.dispose(data => {
        console.log('Cleanup');
    });
}
