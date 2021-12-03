class EventManager {
  events = {};

  emit = (eventId) => {
    for (var key in this.events[eventId]) {
      this.events[eventId][key]();
    }
  };

  add = (eventId, callback) => {
    if (this.events[eventId]) {
      this.events[eventId][callback.toString()] = callback;
    } else {
      this.events[eventId] = {
        [callback.toString]: callback,
      };
    }
  };

  remove = (eventId, callback) => {
    delete this.events[eventId][callback.toString()];
  };

  //clean up all listeners and reset them to remove memory leaks
  dispose = () => {
    for (var key in this.events) {
      delete this.events[key];
    }
  };
}

window = new EventManager();
window.testFunction2 = () => {
  console.log("woohoo 2nd test worked!");
};

window.add("test", () => {
  console.log("woohoo test worked!");
});
window.add("test", window.testFunction2);
window.add("test", () => {
  console.log("woohoo 3rd test worked!");
});

window.emit("test");
window.remove("test", window.testFunction2);
window.emit("test");
window.dispose();
window.emit("test");
