# bomweather-mqtt

Publishes weather from Bureau of Meteorology Australia over MQTT.

Checks every 10 minutes (or configured interval) and publishes to `{prefix}/current`.

For example, given a configured prefix of `bomweather` an event will be emitted on `bomweather/current`.

## Running

It is intended to be installed globally, ie `npm i -g bomweather-mqtt`

Create a YAML file somewhere. See `config.example.yml`

Run (replace path)

```
CONFIG_PATH=/path/to/config.yml bomweather-mqtt
```

You can also use Consul for config. See [mqtt-usvc](https://www.npmjs.com/package/mqtt-usvc) for more details.

## Example Config

```yml
mqtt:
  uri: mqtt://localhost
  prefix: bomweather/
service:
  observations_url: "http://reg.bom.gov.au/fwo/IDV60901/IDV60901.95866.json"
  poll_interval: 600000
```

poll_interval is optional.

## Finding The Observation URL

1. Go to http://www.bom.gov.au/catalogue/data-feeds.shtml
2. Scroll down to "Observations - individual stations"
3. Browse around until you reach an observation page. The URL will look something like this - http://reg.bom.gov.au/products/IDV60901/IDV60901.94866.shtml
4. Find the "Other Formats" section on the page.
5. Copy the URL for the JSON format, which will look something like - http://reg.bom.gov.au/fwo/IDV60901/IDV60901.94866.json

