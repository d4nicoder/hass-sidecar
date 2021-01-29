[![CodeFactor](https://www.codefactor.io/repository/github/danitetus/hass-sidecar/badge)](https://www.codefactor.io/repository/github/danitetus/hass-sidecar)

# Home assistant sidecar

## Description

This is an app written in **Typescript** and **NodeJS** to interact with your Home Assistant installation. It manages the websocket and the MQTT connections with your host(s), and you can write your own automations in typescript in a simple way.

All automations are *hotloaded*, so you can create, modify and delete automations and they will be unloaded and loaded on the fly, without reboot the app.

## Why

Home Assistant is a great platform to manage our smart devices, but for me the automations system is not entirely powerful, and on many occasions I need to do more complex things that I cannot do with a simple yaml or with the web interface. I love typescript and NodeJS and it is faster for me to write automations in this environment.

## Getting started

For detailed information about clases and methods, go to [docs/globals.md](docs/globals.md)

### Installation

#### > NodeJS version

```bash
# Clone the repo
git clone git@github.com:d4nicoder/hass-sidecar
# Change directory
cd hass-sidecar
# Install dependencies
npm ci
```

#### > Docker run version

```bash
docker run \
  -e HA_HOST=<your-host> \
  -e HA_TOKEN=<token> \
  -e MQTT_URI=<mqtt-uri> \
  -v <path/to/your/automations/folder>:/opt/app/src/automations \
  --restart=unless-stopped \
  danitetus/hass-sidecar:latest
```

#### > Docker compose version

```yaml
version: '3'
services:
  hass-sidecar:
    image: danitetus/hass-sidecar:latest
    environment:
      HA_HOST: <home-assistant-host>
      HA_TOKEN: <home-assistant-token>
      MQTT_URI: <mqtt-uri>
    volumes:
      - <path/to/your/automations/folder>:/opt/app/src/automations
    restart: unless-stopped
```
### NodeJS Dependencies
You can install dependencies directly with npm (on native installations) or in the docker version setting up an environment variable called **DEPENDENCIES**.

__NodeJS__
```bash
npm install dependency1 dependency2 ...
```

__Docker__
```bash
docker run \
  -e HA_HOST=<your-host> \
  -e HA_TOKEN=<token> \
  -e MQTT_URI=<mqtt-uri> \
  -e DEPENDENCIES= dependency1 dependency2 ...
  -v <path/to/your/automations/folder>:/opt/app/src/automations \
  --restart=unless-stopped \
  danitetus/hass-sidecar:latest
```
__


### Setup

The best way to setup is to create a **.env** file in the projects root folder. You have tu set these variables:

```bash
HA_HOST: http://your-host-or-ip:8123
HA_TOKEN: <token-provided-from-home-assistant>
MQTT_URI: mqtt://user:pass@server:port
```

### Start

```bash
npm start
```

## Creating automations

All automations have to be stored in **./src/automations** (you can organize them in subfolders). They should extend **Automation** class.

Let's create an automation example. We are going to turn on and off a light when occupancy sensor changes:

```typescript
/*
  ./src/automations/presenceLight.ts
*/

import { Automation } from '../interfaces/Automation.ts'

module.exports = class MyAutomation extends Automation {
  private lightEntity = '<entity_id>'
  private sensorEntity = '<entity_id>'

  constructor() {
    super('Title of my automation', 'Description') // Title and description are optional

    this.onStateChange(this.sensorEntity, (newState, oldState) => {
      if (newState.state === 'on') {
        this.callService('light', 'turn_on', this.lightEntity, {
          // Attributes are optional
          transition: 3
        })
      } else if (newState.state === 'off') {
        this.callService('light', 'turn_off', this.lightEntity, {
          // Attributes are optional
          transition: 3
        })
      }
    })
  }
}
```

### Timeouts, intervals and runAt

To be able to create tasks in intervals or timeouts or simply execute a function at a certain time. You must use the methods of the Automation class dedicated to this. Do not use the NodeJS commands (setInterval, setTimeout, clearInterva, clearTimeout) because if your class has to be reloaded (due to a modification or because it has been removed), those callbacks will not be able to be removed, which will cause them to be executed anyway or the application fail.

Let's see an example of this:

```typescript
/*
  ./src/automations/crazyLights.ts
*/

/**
 * Let's create an automation to do:
 *  - toggle a light every 10 seconds
 *  - say something in one speaker after 10 minutes
 *  - clear the interval when 60 seconds have passed
*/

import { Automation } from '../interfaces/Automation.ts'
import moment from 'moment'

module.exports = class CrazyLights extends Automation {
  
  // Define our private properties
  private lightEntity = '<entity_id>'
  private speakerEntity = '<entity_id>'
  private intervalId: NodeJS.Timeout

  /**
   * Instantiate
   */
  constructor () {
    // Good practice to define title and description (for the logs)
    super('Crazy lights', 'Lights going crazy')

    // Define toggle action on 10 seconds interval
    this.intervalId = this.setInterval(() => {
      this.callService('light', 'toggle', this.lightEntity)
    }, 10000)

    // Let's delete the interval after 60 seconds
    this.setTimeout(() => {
      this.clearTimeout(this.intervalId)
    }, 60000)

    // After 10 minutes, say something on the speaker
    this.runAt(moment().add(10, 'minutes').toDate(), () => {
      this.callService('tts', 'google_cloud_say', this.speakerEntity, {
        message: 'This light is crazy'
      })
    })
  }
}
```

## Create your own libraries

You can create your own libraries to use in your automations. They have to be placed inside a "lib" folder. This is mandatory because these folders are ignored to load as automations.

Let's see an example:

```typescript

/*
  ./src/automations/lib/sayHello.ts
*/

export sayHello = (name: string): string => {
  return `Hi ${name}!`
}
```

```typescript
/*
  ./src/automations/sayHi.ts
*/

import { Automation } from '../interfaces/Automation.ts'
import { sayHello } from './lib/sayHello.ts'

module.exports = class SayHi extends Automation {
  constructor() {
    super('Say hello', 'Just for education')

    sayHello('Daniel')
  }
}
```

## About logging

You can use for loggin the class provided for it. Why? Because it allows you to trace the time of every log and define color for each line based on his type (debug, info, error, log, warning...). Of course you can still use the typical console.[log|error|info...], but it will be horrible for your eyes xD.
