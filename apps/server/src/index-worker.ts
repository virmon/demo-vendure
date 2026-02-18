import { bootstrapWorker } from '@vendure/core';
import { config } from './vendure-config';
import http from 'http';

bootstrapWorker(config)
    .then(worker => {
        worker.startJobQueue();
        // START A DUMMY SERVER FOR CLOUD RUN HEALTH CHECKS
        const port = process.env.PORT || 3000;
        http.createServer((req, res) => {
            res.writeHead(200);
            res.end('Worker is healthy');
        }).listen(port);

        console.log(`Worker health check listening on port ${port}`);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
