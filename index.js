const core = require("@actions/core");
const github = require("@actions/github");

try {
  console.log(github.context);
} catch (error) {
  core.setFailed(error.message);
}
