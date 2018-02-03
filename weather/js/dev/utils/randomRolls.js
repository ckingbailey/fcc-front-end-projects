module.exports = {
  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  randomFlt: function(min, max) {
    return Math.random() * (max - min) + min;
  }
}
