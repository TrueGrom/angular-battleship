import { AppSettings } from '@settings';

import range from 'lodash/range';

export const ROWS = <ReadonlyArray<number>>range(AppSettings.ROWS);
export const COLS = <ReadonlyArray<number>>range(AppSettings.COLS);
