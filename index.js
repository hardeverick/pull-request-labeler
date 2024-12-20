const core = require("@actions/core");
const github = require("@actions/github");

try {
  console.log(github.context);
  console.log("needs-review-label", core.getInput("needs-review-label"));
  console.log("needs-dev-label", core.getInput("needs-dev-label"));
} catch (error) {
  core.setFailed(error.message);
}
