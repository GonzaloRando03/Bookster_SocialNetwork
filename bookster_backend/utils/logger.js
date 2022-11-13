const info = (...params) => {
    console.log(...params)
  }
  
  const error = (...params) => {
    console.error('Error: ', ...params)
  }
  
  module.exports = {
    info, error
  }