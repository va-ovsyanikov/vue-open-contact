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
