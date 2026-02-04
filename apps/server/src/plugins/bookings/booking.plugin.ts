import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';

import { BOOKING_PLUGIN_OPTIONS } from './constants';
import { PluginInitOptions } from './types';
import { defineDashboardExtension } from '@vendure/dashboard';

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [{ provide: BOOKING_PLUGIN_OPTIONS, useFactory: () => BookingPlugin.options }],
    configuration: config => {
        // Plugin-specific configuration
        // such as custom fields, custom permissions,
        // strategies etc. can be configured here by
        // modifying the `config` object.
        return config;
    },
    compatibility: '^3.0.0',
    dashboard: './index.tsx',
})
export class BookingPlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<BookingPlugin> {
        this.options = options;
        return BookingPlugin;
    }
}