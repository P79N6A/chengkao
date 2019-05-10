import Home from '../components/Home'

export default {
  mode: 'hash',
  routes: [
    {path: '/home', component: Home, alias: '/'},
    {path: '/:xueke', component: Home},
    {
      path: '*',
      component: {
        template: '<div>404</div>'
      }
    }
  ]
}
