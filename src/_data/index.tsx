import { chipotle } from "./restaurants/chipotle";
import { dq } from "./restaurants/dq";
import { og } from "./restaurants/og";
import { starbucks } from "./restaurants/starbucks";
import { RestaurantDatabase } from "./types";

export const database: RestaurantDatabase = {
  dq: dq,
  chipotle: chipotle,
  starbucks: starbucks,
  og: og,
};