# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2020-10-26

### Fixed
 - Changed lib to ES2015 on tsconfig.json
 - Included @types/node as dev dependencies

## [0.3.3] - 2019-09-21

### Fixed
 - Automations changes are not detected

## [0.3.2] - 2019-09-21

### Fixed
 - Automations were not loaded on init

## [0.3.1] - 2019-09-21
### Breaking changes
 - All calls to onStateChange and onConcretState should validate oldState because sometimes it could be null. You have to adapt your automations or you will be alerted by tslint and maybe your code could crash when receive a null object in the old state.

### Added
 - Automation class: lightTurnOn, lightTurnOff, lightToggle, switchTurnOn, switchTurnOff, switchToggle

### Changed
 - Little refactoring of code
 - Better organization of files

