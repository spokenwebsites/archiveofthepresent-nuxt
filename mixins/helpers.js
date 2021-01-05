export default {
  methods: {
    join(array, value) {
      const parts = []
      if (value) {
        for (const part of array) {
          parts.push(part[value].trim())
        }
      } else {
        for (const part of array) {
          parts.push(part.trim())
        }
      }
      return parts.join(', ')
    },

    debounce(fn, delay = 300) {
      return ((...args) => {
        let timeout
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          timeout = null
          fn(...args)
        }, delay)
      })()
    }

    // debounce (fn, delay) {
    //   var timeoutID = null
    //   return function () {
    //     clearTimeout(timeoutID)
    //     var args = arguments
    //     var that = this
    //     timeoutID = setTimeout(function () {
    //       fn.apply(that, args)
    //     }, delay)
    //   }
    // }
  }
}
