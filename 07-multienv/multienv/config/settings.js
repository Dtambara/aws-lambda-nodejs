const env = require('env-var')

const settings = {
  NODE_ENV: env.get('NODE_ENV').required().asString(),
  CommitMessagesUrl: env.get('APICommitMessageURL').required().asString(),
  TableName: env.get('DbTableName').required().asString(),
  DbWriteCapacityUnits: env.get('DbWriteCapacityUnits').required().asString(),
  DbReadCapacityUnits: env.get('DbReadCapacityUnits').required().asString(),
}

module.exports = settings
