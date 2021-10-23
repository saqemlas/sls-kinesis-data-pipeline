import {KinesisStreamHandler, KinesisStreamRecord} from 'aws-lambda/trigger/kinesis-stream';
import {Context} from 'aws-lambda';

export const handler: KinesisStreamHandler = async (event, context?: Context) => {
    console.log('Event', {event});

    event.Records.forEach((record: KinesisStreamRecord, index: number) => {
        const data = JSON.parse(Buffer.from(record.kinesis.data, 'base64').toString('utf-8'));
        console.log('data', {data});
        /// do whatever
    });
};
