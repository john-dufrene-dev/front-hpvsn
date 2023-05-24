import { startStimulusApp } from '@symfony/stimulus-bridge';
import { registerReactControllerComponents } from '@symfony/ux-react';
// import AOS (Cool Animate Effects on Scroll)
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'aos/dist/aos.js';

// Registers React controller components to allow loading them from Twig
//
// React controller components are components that are meant to be rendered
// from Twig. These component then rely on other components that won't be called
// directly from Twig.
//
// By putting only controller components in `react/controllers`, you ensure that
// internal components won't be automatically included in your JS built file if
// they are not necessary.
registerReactControllerComponents(require.context('./js/components', true, /\.(j|t)sx?$/));

// Registers Stimulus controllers from controllers.json and in the controllers/ directory
export const app = startStimulusApp(require.context(
    '@symfony/stimulus-bridge/lazy-controller-loader!./controllers',
    true,
    /\.[jt]sx?$/
));

console.log(AOS);

AOS.init({
    easing: 'ease-out-back',
    duration: 1000
});

// register any custom, 3rd party controllers here
// app.register('some_controller_name', SomeImportedController);
