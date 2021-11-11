import {KinesisStreamEvent, KinesisStreamRecord} from 'aws-lambda/trigger/kinesis-stream';
import {logger} from '../common/logger';
import {Event} from '../types/interfaces';

async function handler (event: KinesisStreamEvent): Promise<void> {
    logger.info('event :', {event});

    const records: Event[][] = event.Records.map((record: KinesisStreamRecord) => {
        return JSON.parse(Buffer.from(record.kinesis.data, 'base64').toString('utf-8'));
    });

    logger.info(`Records ${records.length} parsed :`, {records});

    // throw new Error('trigger sqs destinations')
};

export {handler};
