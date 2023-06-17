import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import plugin from 'windicss/plugin'


export default defineConfig({
  /* configurations... */
  attributify: false,

  plugins: [
    require('windicss/plugin/typography'),
    require('windicss/plugin/forms'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/line-clamp'),
    require('windicss/plugin/scroll-snap'),
    require('windicss/plugin/tables'),
    require('windicss/plugin/filters'),
    require('windicss/plugin/interactivity'),
  ]
})