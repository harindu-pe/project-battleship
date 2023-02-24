// ship factory function
function ship(size) {
  return {
    length: size,
    timesHit: 0,
    sinkStatus: false,
    hit: function () {
      if (this.timesHit < this.length) {
        this.timesHit += 1;
      }
    },
    isSunk: function () {
      return true ? this.timesHit === this.length : false;
    },
  };
}

export default ship;
