import _ from 'lodash'
import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import InputMixin from 'ember-frost-bunsen/mixins/input'

export default Ember.Component.extend(InputMixin, {
  classNames: ['frost-field'],

  /**
   * Render the value (or a dash if not present
   * @param {Boolean} value - the value to render
   * @param {Cell} cellConfig - the cell config
   * @returns {ReactComponent} the rendered value
   */
  @readOnly
  @computed('bunsenId', 'store.formValue')
  renderValue: function (bunsenId, formValue) {
    return _.get(formValue, bunsenId)
  }
})
