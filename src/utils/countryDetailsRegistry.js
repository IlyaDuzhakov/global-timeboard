import { countryDetailsEurope } from "./countryDetailsEurope.js";
import {countryDetailsAsia} from "./countryDetailsAsia.js"
import {countryDetailsAfrica} from "./countryDetailsAfrica.js"

export const countryDetailsRegistry = {
  ...countryDetailsAsia,
  ...countryDetailsEurope,
  ...countryDetailsAfrica,
};