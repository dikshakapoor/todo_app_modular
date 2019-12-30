class CoffeeMachine {
    #waterLimit = 200;
  
    #checkWater(value) {
      if (value < 0) throw new Error("Negative water");
      if (value > this.#waterLimit) throw new Error("Too much water");
    }
  
  }