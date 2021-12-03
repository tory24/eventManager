class EventManager {
  events = {};

  // Handle functions that require multiple parameters
  emit = (eventId, ...args) => {
    if (this.events[eventId]) {
      this.events[eventId].forEach((x) => x(...args));
    }
  };

  // Try to prevent duplicate keys
  add = (eventId, callback) => {
    if (this.events[eventId]) {
      this.events[eventId].push(callback);
    } else {
      this.events[eventId] = [callback];
    }
  };

  remove = (eventId, callback) => {
    if (this.events[eventId]) {
      const index = this.events[eventId].findIndex((i) => i === callback);
      index >= 0 && this.events[eventId].splice(1, index);
    }
  };

  // Check if nulling then setting to empty object is better or not?
  dispose = () => {
    this.events = {};
    // for (var key in this.events) {
    //   delete this.events[key];
    // }
  };
}

window = new EventManager();

// Test
window.testFunction2 = () => {
  console.log("test #2 worked!");
};
window.add("test", () => console.log("test #1 worked!"));
window.add("test", window.testFunction2);

// 2 Parameters
window.add("Double Param Test", (param1, param2) => {
  console.log("Double Param Test worked!", { param1, param2 });
});

// 2+ Parameters
window.add("TripleParamTest", (param1, param2, param3) => {
  console.log("TripleParamTest event fired!", {
    param1,
    param2,
    param3,
  });
});

// Tennet
window.add("tennet", () => console.log("tennet 1 worked!"));

/* Emits */
// window.emit("Double Param Test", 1, { a: "custom object" });
// window.emit("TripleParamTest", 1, "2", [1, 2, 3]);

window.emit("test");
window.remove("test", window.testFunction2);
window.emit("test");
// window.emit("tennet");
