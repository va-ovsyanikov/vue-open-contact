import axios from 'axios'
const endpoint = 'https://api.github.com/graphql'
const token = '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'

const headers = {
  'content-type': 'application/json',
  Authorization: `Bearer ${token}`,
}

export const request = async query => {
  const response = await axios({
    url: endpoint,
    method: 'post',
    headers: headers,
    data: {
      query,
    },
  })
  return response
}
