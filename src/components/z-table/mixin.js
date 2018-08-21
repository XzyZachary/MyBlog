export default {
    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      columns: {
        type: Array,
        default() {
          return [];
        }
      },
      size: {
        validator(value) {
          return ["medium", "small", "mini"].indexOf(value) >= 0;
        },
        default: "small"
      },
      width: {
        type: [Number, String]
      },
      height: {
        type: [Number, String]
      },
      stripe: {
        type: Boolean,
        default: true
      },
      border: {
        type: Boolean,
        default: true
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      highlightRow: {
        type: Boolean,
        default: false
      },
      rowClassName: {
        type: Function,
        default() {
          return '';
        }
      },
      cellClassName: {
        type: [Function, String]
      },
      context: {
        type: Object
      },
      noDataText: {
        type: String
      },
      noFilteredDataText: {
        type: String
      },
      disabledHover: {
        type: Boolean
      },
      loading: {
        type: Boolean,
        default: false
      },
      groupHeader: {
        type: Boolean,
        default: false
      },
      fixedData: {
        type: Array,
        default: function () {
          return [];
        }
      },
      fixedDirection: {
        type: String,
        default: 'bottom',
        validator: function (value) {
          return ['bottom', 'top'].indexOf(value) >= 0;
        }
      }
    }
  }
  