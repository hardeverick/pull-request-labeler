const core = require("@actions/core");
const github = require("@actions/github");
const octokit = github.getOctokit(github.getInput("token"));

try {
  console.log(github.context);
  console.log("needs-review-label", core.getInput("needs-review-label"));
  console.log("needs-dev-label", core.getInput("needs-dev-label"));

  if (
    github.context.payload.action == "opened" ||
    github.context.payload.action == "edited"
  ) {
    await octokit.rest.issues.addLabels({
      owner: github.context.payload.repository.owner.login,
      repo: github.context.payload.repository.name,
      issue_number: github.context.payload.pull_request.number,
      labels: [core.getInput("needs-review-label")],
    });
  } else if (github.context.eventName == "pull_request_review") {
    if (github.context.payload.review.state == "changes_requested") {
      await octokit.rest.issues.addLabels({
        owner: github.context.payload.repository.owner.login,
        repo: github.context.payload.repository.name,
        issue_number: github.context.payload.pull_request.number,
        labels: [core.getInput("needs-dev-label")],
      });
    } else if (github.context.payload.review.state == "approved") {
      await octokit.rest.issues.removeLabel({
        owner: github.context.payload.repository.owner.login,
        repo: github.context.payload.repository.name,
        issue_number: github.context.payload.pull_request.number,
        name: core.getInput("needs-review-label"),
      });
    }
  }
} catch (error) {
  core.setFailed(error.message);
}
