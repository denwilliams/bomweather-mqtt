#!/usr/bin/env node

const got = require("got");
const mqttusvc = require("mqtt-usvc");

async function main() {
  const service = await mqttusvc.create();

  const handler = () => {
    got(service.config.observations_url, { json: true }).then(res => {
      const observation = res.body.observations.data[0];

      const current = {
        cloud: observation.cloud,
        temperature: observation.air_temp,
        feelsLike: observation.apparent_t,
        windSpeed: observation.wind_spd_kmh,
        windDir: observation.wind_dir,
        humidity: observation.rel_hum
      };

      service.send("~/current", current, { retain: true });
    });
    // TODO: error handling
  };

  handler();

  // need to set this more intelligently
  setInterval(handler, 600000);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
