# Generic Kinesis Pipeline

## Info 

This handles deployment for a producer (lambda), a kinesis data stream, a 
consumer (lambda), and a sqs dead letter queue for any failed failed attempts 
to process data by the consumer. Configuration for the pipeline optimizes the flow 
of data at scale.

Kinesis Data Streams to collect and process large streams of data records in real 
time. The delay between the time a record is put into the stream and the time it 
can be retrieved (put-to-get delay) is typically less than 1 second. 

To put data into the stream, you must specify the name of the stream, a partition
key, and the data blob to be added to the stream. The partition key is used to 
determine which shard in the stream the data record is added to.

All the data in the shard is sent to the same worker that is processing the shard. 
Which partition key you use depends on your application logic. The number of partition 
keys should typically be much greater than the number of shards. This is because 
the partition key is used to determine how to map a data record to a particular shard. 
If you have enough partition keys, the data can be evenly distributed across the 
shards in a stream.

Each PutRecords request can support up to 500 records. Each record in the request can 
be as large as 1 MiB, up to a limit of 5 MiB for the entire request, including partition 
keys. Each shard can support writes up to 1,000 records per second, up to a maximum data 
write total of 1 MiB per second.

For more information...
- [AWS Documentation: Kinesis Data Streams](https://docs.aws.amazon.com/streams/latest/dev/amazon-kinesis-streams.html)
- [AWS Documentation: Kinesis Producers](https://docs.aws.amazon.com/streams/latest/dev/amazon-kinesis-producers.html)
- [AWS Documentation: Kinesis Consumers](https://docs.aws.amazon.com/streams/latest/dev/amazon-kinesis-consumers.html)
- [Api Reference: PutRecord](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecord.html)
- [Serverless Framework: Kinesis Events](https://www.serverless.com/framework/docs/providers/aws/events/streams)


## Architecture

<p align="center">
  <img src="/architecture-diagram.drawio.svg" />
</p>

## Usage 

### Credentials:
```bash
export AWS_PROFILE=<profile_name>
```

### Install Dependencies:

```bash
yarn run install
```

### Deploy:

```bash
yarn run deploy
```

### Remove:

```bash
yarn run remove
```
