# Generic Kinesis Pipeline

## Info 

This handles deployment for a kinesis data pipeline, with 
- a consumer (lambda), 
- a producer (lambda), 
- and kinesis stream.


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
