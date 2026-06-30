import { countryDetailsEurope } from "./countryDetailsEurope.js";
import {countryDetailsAsia} from "./countryDetailsAsia.js"

export const countryDetailsRegistry = {
  ...countryDetailsAsia,
  ...countryDetailsEurope,
};