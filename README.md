# bomweather-mqtt

Publishes weather from Bureau of Meteorology Australia over MQTT.

Checks every 10 minutes and publishes to `prefix/current`.

## Example Config

```
mqtt:
  uri: mqtt://localhost
  prefix: bomweather/
service:
  latitude: -37.814
  longitude: 144.96332
```

## Running

```
CONFIG_PATH=/path/to/config.yml bomweather-mqtt
```
