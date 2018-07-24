import moment from 'moment'
import Vue from 'vue'

/*   outcome/
 * This function will filter the valid value
 * and return the date in format MM/DD/YYYY hh:mm.
 *  
 */
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
})
