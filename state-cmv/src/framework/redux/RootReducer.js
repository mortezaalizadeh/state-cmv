import { combineReducers } from '@reduxjs/toolkit';

import { DriverLicensePhotoSlice } from '../../features/driver-license-photo';
import { LicensePlatePhotoSlice } from '../../features/license-plate-photo';
import { QuoteSlice } from './quote';
import { VehicleSlice } from './vehicle';
import { LocationSlice } from './location';
import { InsuranceSlice } from './insurance';

const RootReducer = combineReducers({
  driverLicensePhoto: DriverLicensePhotoSlice,
  licensePlatePhoto: LicensePlatePhotoSlice,
  quote: QuoteSlice,
  vehicle: VehicleSlice,
  location: LocationSlice,
  insurance: InsuranceSlice,
});

export default RootReducer;
