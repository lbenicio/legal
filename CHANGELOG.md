# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.2] - 2026-10-31

### Added
- Initial project setup.

### Changed

- Bumped the project patch version to `1.2.2`.
- Routed AWS deployment through GitHub’s `production` environment, restricted to the `main` branch.

## [1.2.1] - 2026-10-16

### Changed

- Replaced the GitHub Pages deployment with the existing AWS S3 and CloudFront stack.
- Resolved deployment resources from CloudFormation outputs and aligned the AWS scripts with the live `legal` stack.

## [v1.0.1]

### Fixed
- Fixed a bug that caused the application to crash on startup.

## [v1.1.1]

### Added
- Added a new feature that allows users to export data to CSV format.

### Changed
- Updated the user interface to improve usability.
