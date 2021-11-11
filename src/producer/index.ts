import {KinesisClient, PutRecordsCommand, PutRecordsRequestEntry} from '@aws-sdk/client-kinesis';
import {logger} from '../common/logger';
import {Event} from '../types/interfaces';
import {v4 as uuid} from 'uuid';

const streamName: string = process.env.KINESIS_STREAM || '';
const kinesis = new KinesisClient({region: process.env.AWS_REGION || ''});

async function handler(): Promise<void> {
    // create 100 records with 100 items in array
    const data: Event = {id: uuid(), data: 'Success'};
    const dataGroup: Event[][] = Array(10).fill(Array(10 * 10).fill(data));

    const records: PutRecordsRequestEntry[] = dataGroup.map((items: Event[], i: number) => {
        return {
            PartitionKey: `${uuid()}-${i}`,
            Data: Buffer.from(JSON.stringify(items), 'utf-8'),
        }
    });

    const response = await kinesis.send(new PutRecordsCommand({
        StreamName: streamName,
        Records: records
    }));

    if (response.$metadata.httpStatusCode !== 200 || response.FailedRecordCount !== 0){
        throw new Error(`Failed adding records to kinesis ${streamName}`);
    }

    logger.info(`Added ${response.Records?.length} to kinesis ${streamName}`);
};

export {handler};
