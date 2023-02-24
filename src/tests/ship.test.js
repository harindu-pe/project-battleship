import ship from "../ship";

describe("Ship", () => {
  let shipTest;

  beforeEach(() => {
    shipTest = ship(3);
  });

  test("creates and initializes a ship", () => {
    expect(shipTest.length).toBe(3);
  });

  test("takes a hit", () => {
    shipTest.hit();
    expect(shipTest.timesHit).toEqual(1);
  });

  test("sinks", () => {
    shipTest.hit();
    shipTest.hit();
    shipTest.hit();
    expect(shipTest.isSunk()).toBe(true);
  });
});
