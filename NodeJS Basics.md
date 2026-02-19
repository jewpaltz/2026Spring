# NodeJs & NPM

## 1. NodeJs

- NodeJs is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- Primarily used for building server-side applications, but can also be used for general scripting.
- NodeJs alternatives include Deno and Bun.

## 2. NPM (Node Package Manager)

- NPM is the default package manager for NodeJs.
- `node_modules` is the directory where NPM installs the packages and their dependencies.
- NPM alternatives include Yarn and pnpm.

### Package.json

- The `package.json` file is a manifest file that contains metadata about the project and its dependencies.
- Must be valid JSON format.
- It includes information such as the project name, version, description, main entry point, scripts, and dependencies.
    - `dependencies` field lists the packages required for the application to run.
    - `devDependencies` field lists the packages required for development and testing.
    - `peerDependencies` field lists the packages that are required by the package but are expected to be provided by the consuming project.
    - global installation of packages can be done using the `-g` flag with npm, which allows the package to be used across the entire system.

    - `scripts` field allows you to define custom commands that can be run using `npm run <script-name>`. For example, you can define a script for starting the server or running tests.

### Semver (Semantic Versioning)

    - Semver is a versioning scheme that uses a three-part version number: `MAJOR.MINOR.PATCH`.
        - `MAJOR` version is incremented when there are incompatible API changes.
        - `MINOR` version is incremented when functionality is added in a backward-compatible manner.
        - `PATCH` version is incremented when backward-compatible bug fixes are made.
    - ^ (caret) allows updates that do not change the leftmost non-zero digit in the version number. For example, `^1.2.3` allows updates to `1.x.x` but not `2.x.x`.
    - ~ (tilde) allows updates that do not change the rightmost non-zero digit in the version number. For example, `~1.2.3` allows updates to `1.2.x` but not `1.3.x`.
