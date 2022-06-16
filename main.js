#!/usr/bin/env node

const got = require("got");
const mqttusvc = require("mqtt-usvc");
const pkg = require("./package.json");

async function main() {
  const service = await mqttusvc.create();

  const { observations_url, poll_interval = 600000 } = service.config;

  const handler = async () => {
    try {
      const body = await got(observations_url).json();
      const observation = body.observations.data[0];

      const current = {
        cloud: observation.cloud,
        temperature: observation.air_temp,
        feelsLike: observation.apparent_t,
        windSpeed: observation.wind_spd_kmh,
        windDir: observation.wind_dir,
        humidity: observation.rel_hum,
      };

      service.send("~/current", current, { retain: true });
    } catch (err) {
      console.error(`Weather fetch failed: ${err}`);
    }
  };

  handler();

  // need to set this more intelligently, use last update time to know expected update time
  setInterval(handler, poll_interval);
}

main()
  .then(() => {
    console.log(`${pkg.name} ${pkg.version} started.`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
