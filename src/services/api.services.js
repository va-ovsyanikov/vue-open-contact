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
