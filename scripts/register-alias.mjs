import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

register('./alias-hooks.mjs', pathToFileURL('./scripts/'));
