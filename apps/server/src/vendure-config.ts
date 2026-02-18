import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSchedulerPlugin,
    DefaultSearchPlugin,
    VendureConfig,
    EntityHydrator,
    LanguageCode,
    DefaultLogger,
    LogLevel,
    VendureLogger
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin, FileBasedTemplateLoader } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { DashboardPlugin } from '@vendure/dashboard/plugin';
import { GraphiqlPlugin } from '@vendure/graphiql-plugin';
import 'dotenv/config';
import path from 'path';
import { BookingPlugin } from './plugins/bookings/booking.plugin';
import { StripePlugin } from '@vendure/payments-plugin/package/stripe';
import { CloudTasksPlugin } from "@pinelab/vendure-plugin-google-cloud-tasks";
import { cloudLogger } from './logger';
import { GoogleStorageAssetsPlugin } from '@pinelab/vendure-plugin-google-storage-assets';

const IS_DEV = process.env.APP_ENV === 'dev';
const serverPort = +process.env.PORT || 8080;

let logger: VendureLogger;
export let runningLocal = false;
export let isProd = false;
export let runningInWorker = false;
if (process.env.K_SERVICE) {
  // This means we are in CloudRun
  logger = cloudLogger;
  runningInWorker = process.env.K_SERVICE.includes("worker"); // Name of worker is worker or worker-test
} else {
  logger = new DefaultLogger({ level: LogLevel.Debug });
  runningLocal = true;
}
if (process.env.APP_ENV === "prod") {
  isProd = true;
}

export const config: VendureConfig = {
    apiOptions: {
        port: serverPort,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        trustProxy: IS_DEV ? false : 1,
        // The following options are useful in development mode,
        // but are best turned off for production for security
        // reasons.
        ...(IS_DEV ? {
            adminApiDebug: true,
            shopApiDebug: true,
        } : {}),
    },
    authOptions: {
        tokenMethod: ['bearer', 'cookie'],
        superadminCredentials: {
            identifier: process.env.SUPERADMIN_USERNAME,
            password: process.env.SUPERADMIN_PASSWORD,
        },
        cookieOptions: {
            secret: process.env.COOKIE_SECRET,
        },
    },
    // dbConnectionOptions: {
    //     type: 'postgres',
    //     // See the README.md "Migrations" section for an explanation of
    //     // the `synchronize` and `migrations` options.
    //     synchronize: false,
    //     migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
    //     logging: false,
    //     database: process.env.DB_NAME,
    //     schema: process.env.DB_SCHEMA,
    //     host: process.env.DB_HOST,
    //     port: +process.env.DB_PORT,
    //     username: process.env.DB_USERNAME,
    //     password: process.env.DB_PASSWORD,
    // },
    dbConnectionOptions: {
        type: "mysql",
        synchronize: false,
        logging: false,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        migrations: [path.join(__dirname, "../migrations/*.ts")],
        socketPath: runningLocal
            ? undefined
            : `/cloudsql/${process.env.SOCKET_CONNECTION_NAME}`,
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    // When adding or altering custom field definitions, the database will
    // need to be updated. See the "Migrations" section in README.md.
    customFields: {},
    plugins: [
        GraphiqlPlugin.init(),
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            // For local dev, the correct value for assetUrlPrefix should
            // be guessed correctly, but for production it will usually need
            // to be set manually to match your production url.
            assetUrlPrefix: IS_DEV ? undefined : 'https://www.my-shop.com/assets/',
        }),
        DefaultSchedulerPlugin.init(),
        DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            route: 'mailbox',
            handlers: defaultEmailHandlers,
            templateLoader: new FileBasedTemplateLoader(path.join(__dirname, '../static/email/templates')),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation.
                // Here we are assuming a storefront running at http://localhost:8080.
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change'
            },
        }),
        DashboardPlugin.init({
            route: 'dashboard',
            appDir: IS_DEV
                ? path.join(__dirname, '../dist/dashboard')
                : path.join(__dirname, 'dashboard'),
        }),
        // BookingPlugin.init({}),
        StripePlugin.init({
            storeCustomersInStripe: true,
            metadata: async (injector, ctx, order) => {
                const hydrator = injector.get(EntityHydrator);
                await hydrator.hydrate(ctx, order, { relations: ['customer'] });
                return {
                    emailAddress: order.customer!.emailAddress,
                    description: `Order #${order.code} for ${order.customer!.emailAddress}`
                }
            }
        }),
        // CloudTasksPlugin.init({
        //     taskHandlerHost: process.env.WORKER_HOST,
        //     projectId: process.env.GCLOUD_PROJECT,
        //     location: "us-central1",
        //     authSecret: process.env.CLOUD_TASKS_SECRET,
        //     queueSuffix: process.env.APP_ENV,
        // }),
        // GoogleStorageAssetsPlugin,
    ],
};
