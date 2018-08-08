import moment from 'moment'
import Vue from 'vue'

/*      understand/
 * Vue allows us to add 'filters' to display values.
 *
 *      outcome/
 * We filter the given value into a nicely formatted date.
 */
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})
