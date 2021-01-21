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
    displayName(name) {
      const firstName = name.split(',')[1]
      const lastName = name.split(',')[0]
      return name.includes(',') ? `${firstName} ${lastName}` : name
    },
    joinNames(array, value) {
      if (array) {
        const sorted = [...array].sort()
        const parts = []
        if (value) {
          for (const part of sorted) {
            parts.push(this.displayName(part[value].trim()))
          }
        } else {
          for (const part of sorted) {
            parts.push(this.displayName(part.trim()))
          }
        }
        return parts.join(', ')
      } else {
        return array
      }
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
  }
}
