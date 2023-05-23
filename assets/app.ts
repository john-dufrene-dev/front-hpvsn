/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';

// start the Stimulus application
import './bootstrap';

// import AOS (Cool Animate Effects on Scroll)
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'aos/dist/aos.js'

AOS.init({
    easing: 'ease-out-back',
    duration: 10000
});

