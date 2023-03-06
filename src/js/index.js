import '../scss/styles.scss';

const onAppRender = () => {
    console.log('App rendered');
};

export const renderApp = () => {
    onAppRender();
};

window.addEventListener('load', onAppRender);
