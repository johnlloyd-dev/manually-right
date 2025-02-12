// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const env = process.env.ENV || 'local';
const envPath = path.resolve(process.cwd(), `.env.${env}`);
const defaultEnvPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: fs.existsSync(envPath) ? envPath : defaultEnvPath });

export default defineNuxtConfig({
    compatibilityDate: '2024-11-11',
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.BASE_URL
        }
    },
    modules: [
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                config.plugins.push(vuetify({ autoImport: true }))
            })
        },
        '@pinia/nuxt',
        '@vee-validate/nuxt',
    ],
    plugins: [
        '~/plugins/modal.mjs'
    ],
    components: { 
        dirs: [ 
            '~/components',
            '~/layouts',
        ]
    },
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        ssr: {
            noExternal: ['vuetify']
        },
        vue: {
            template: {
                transformAssetUrls,
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ['legacy-js-api']
                }
            }
        }
    }
})
