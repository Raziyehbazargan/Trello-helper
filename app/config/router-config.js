'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('' , '/landing');
  $urlRouterProvider.when('/' , '/landing');

  let states = [
    {
      name: 'landing',
      url: '/landing',
      template: require('../view/landing/landing.html'),
    },
  ];

  states.forEach(state => {
    $stateProvider.state(state);
  });
}
