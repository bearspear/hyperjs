import {loadStylesheets} from '../libs/loadcss.js';

function styles(...stylesheets) {
  return (Component) => class StyledComponent extends Component {

    init(options, done) {
      this.stylesheets = stylesheets || [];
      loadStylesheets(stylesheets, () => {
        super.init(options, done);
      })
    }

    destroy(done) {
      super.destroy(done);
    }

  };
}

export default styles;