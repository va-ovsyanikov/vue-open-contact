export const repositories = `query {
	repositoryOwner(login:"octocat") {
    login,
    repositories(last:8, ownerAffiliations:[OWNER], privacy:PUBLIC) {
        totalCount
        nodes {
        name
          }
        }
      }
    }`

export const issues = name => {
  return `query {
    repository(owner:"octocat", name:"${name}") {
      name
      issues(last:20, states:CLOSED) {
          nodes {
            title
            bodyText
            number
            state
          }
        }
      }
  }`
}

export const comments = number => {
  return `query {
    repository(owner:"octocat", name:"Hello-World") {
      issue(number:${number}) {
        id
        comments(first:20) {
        nodes{
          bodyText
          createdAt
          }
        }
      }
    }
  }`
}
